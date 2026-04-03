import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();

  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data: sessionData, isLoading: loadingSession } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;

  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } =
    useStreamClient(session, loadingSession, isHost, isParticipant);

  // 🔥 FIXED AUTO JOIN (NO LOOP)
  useEffect(() => {
    if (!session || !user || loadingSession) return;

    // already in session → STOP
    if (isHost || isParticipant) return;

    // session already full → STOP
    if (session.participant) return;

    // mutation running → STOP
    if (joinSessionMutation.isPending) return;

    joinSessionMutation.mutate(id);
  }, [session, user, loadingSession, id]);

  // 🔥 SAFE REDIRECT
  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed") {
      navigate("/dashboard", { replace: true });
    }
  }, [session, loadingSession, navigate]);

  // find problem
  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);

    const starterCode = problemData?.starterCode?.[newLang] || "";
    setCode(starterCode);
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);

    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (
      confirm(
        "Are you sure you want to end this session? All participants will be notified."
      )
    ) {
      endSessionMutation.mutate(id, {
        onSuccess: () => navigate("/dashboard"),
      });
    }
  };

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* LEFT */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={50} minSize={20}>
                <div className="h-full overflow-y-auto bg-base-200">
                  <div className="p-6 bg-base-100 border-b border-base-300">
                    <div className="flex justify-between">
                      <div>
                        <h1 className="text-3xl font-bold">
                          {session?.problem || "Loading..."}
                        </h1>

                        <p className="text-sm mt-2">
                          Host: {session?.host?.name || "Loading..."} •{" "}
                          {session?.participant ? 2 : 1}/2 participants
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <span
                          className={`badge ${getDifficultyBadgeClass(
                            session?.difficulty
                          )}`}
                        >
                          {session?.difficulty || "Easy"}
                        </span>

                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            className="btn btn-error btn-sm"
                          >
                            {endSessionMutation.isPending ? (
                              <Loader2Icon className="animate-spin" />
                            ) : (
                              <LogOutIcon />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300" />

              <Panel>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />

                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300" />

          {/* RIGHT */}
          <Panel>
            <div className="h-full p-4">
              {isInitializingCall ? (
                <Loader2Icon className="animate-spin" />
              ) : !streamClient || !call ? (
                <PhoneOffIcon />
              ) : (
                <StreamVideo client={streamClient}>
                  <StreamCall call={call}>
                    <VideoCallUI chatClient={chatClient} channel={channel} />
                  </StreamCall>
                </StreamVideo>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;