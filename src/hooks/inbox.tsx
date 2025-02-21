import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import SendRequest from "@/API/request";

type Message = {
  id: number;
  text: string;
  detailed: string;
  createdAt: string;
  read: boolean;
};

type InboxContextType = {
  isInboxOpen: boolean;
  toggleInboxPopup: () => void;
  inboxMessages: Message[];
  handleMarkAsRead: (id: number) => void;
};

const InboxContext = createContext<InboxContextType | undefined>(undefined);

export const useInbox = () => {
  const context = useContext(InboxContext);
  if (context === undefined) {
    throw new Error("useInbox must be used within an InboxProvider");
  }
  return context;
};

const InboxDisplay = () => {
  const { isInboxOpen, toggleInboxPopup, inboxMessages, handleMarkAsRead } =
    useInbox();

  return isInboxOpen ? (
    <div className="fixed inset-0 z-60 bg-black/50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Inbox</h2>
          <Button variant="ghost" size="icon" onClick={toggleInboxPopup}>
            <X className="w-6 h-6" />
          </Button>
        </div>
        <div className="mt-4 space-y-4 max-h-80 scrollbar scrollbar-thumb-rounded-sm scrollbar-thumb-primary scrollbar-track-background scrollbar-w-1.5 overflow-y-scroll overflow-x-hidden pr-4">
          {inboxMessages.length === 0 ? (
            <p className="text-gray-500 text-center">Your inbox is empty</p>
          ) : (
            inboxMessages.map((message) => (
              <div
                key={message.id}
                className={`p-3 border-b ${message.read ? "bg-gray-100" : "bg-white"}`}
              >
                <p className="text-sm text-gray-500">{message.createdAt}</p>
                <p className="font-medium">{message.text}</p>
                <p className="text-sm text-gray-600">{message.detailed}</p>
                {!message.read && (
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => handleMarkAsRead(message.id)}
                  >
                    Mark as Read
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default function InboxProvider({ children }: { children: ReactNode }) {
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [inboxMessages, setInboxMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function FetchInbox() {
      const response = await SendRequest({
        method: "GET",
        route: "/user/inbox",
      });
      if (!response.error) {
        setInboxMessages(response.data);
      }
    }

    FetchInbox();
  }, [isInboxOpen]);

  const toggleInboxPopup = () => setIsInboxOpen(!isInboxOpen);

  const handleMarkAsRead = async (id: number) => {
    // Make API request to mark the message as read
    const response = await SendRequest({
      method: "POST",
      route: `/user/inbox/mark-read/${id}`,
    });

    if (!response.error) {
      setInboxMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === id ? { ...msg, read: true } : msg,
        ),
      );
    }
  };

  return (
    <InboxContext.Provider
      value={{ isInboxOpen, toggleInboxPopup, inboxMessages, handleMarkAsRead }}
    >
      {children}
      {isInboxOpen && <InboxDisplay />}
    </InboxContext.Provider>
  );
}
