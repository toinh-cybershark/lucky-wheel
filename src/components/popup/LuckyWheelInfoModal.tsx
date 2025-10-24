import { X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import EventDetailsTab from "./tabs/EventDetailsTab";
import InviteTab from "./tabs/InviteTab";
import RequirementsTab from "./tabs/RequirementsTab";
import TabButton from "./tabs/TabButton";

const LuckyWheelInfoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "details" | "requirements" | "invite"
  >("details");

  return (
    <>
      {/* Trigger Buttons */}
      <div className="absolute -left-[16px]  top-5 rotate-[30deg] flex flex-col gap-1  z-10">
        <button
          onClick={() => {
            console.log("onClick");

            setIsOpen(true);
            setActiveTab("details");
          }}
          className="w-10 h-10 rounded-full  hover:scale-110 transition-all shadow-lg flex items-center justify-center  -rotate-[30deg] ml-2.5"
        >
          <img
            src="/gift-action-popup.png"
            className="object-cover w-full h-full"
          />
        </button>
        <button
          onClick={() => {
            setIsOpen(true);
            setActiveTab("requirements");
          }}
          className="w-10 h-10 rounded-full hover:scale-110 transition-all shadow-lg flex items-center justify-center  -rotate-[30deg]"
        >
          <img src="/question-tab.png" className="object-cover w-full h-full" />
        </button>
        <button
          onClick={() => {
            setIsOpen(true);
            setActiveTab("invite");
          }}
          className="w-10 h-10 rounded-full hover:scale-110  shadow-lg flex items-center justify-center -rotate-[30deg] ml-1.5"
        >
          <img src="/link-action.png" className="object-cover w-full h-full" />
        </button>
      </div>

      {/* Popup Modal */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/75  flex items-center justify-center z-50 ">
            <div className="relative max-w-[640px] max-h-[740px]  h-fit w-full">
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-[36px] -right-[28px] w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-all shadow-lg z-10"
              >
                <X size={20} />
              </button>
              <div className="bg-gradient-to-br from-[#263493] to-[#11194D] rounded-2xl w-full   shadow-2xl   h-full p-7 flex flex-col gap-y-7">
                {/* Tabs */}
                <div className="flex gap-1 p-1 rounded-2xl bg-[#0E143B]">
                  <TabButton
                    icon={
                      <img
                        src={
                          activeTab == "details" ? "gift.gif" : "/gift-tab.png"
                        }
                        className="object-cover size-5"
                      />
                    }
                    label="Event Details"
                    active={activeTab === "details"}
                    onClick={() => setActiveTab("details")}
                  />
                  <TabButton
                    icon={
                      <img
                        src={
                          activeTab == "requirements"
                            ? "light-bulb.gif"
                            : "/light-bulb.png"
                        }
                        className="object-cover w-5 h-5"
                      />
                    }
                    label="Requirements Note"
                    active={activeTab === "requirements"}
                    onClick={() => setActiveTab("requirements")}
                  />
                  <TabButton
                    icon={
                      <img
                        src={
                          activeTab == "invite"
                            ? "love-letter.gif"
                            : "/love-letter.png"
                        }
                        className=" w-5 "
                      />
                    }
                    label="Invite Friends"
                    active={activeTab === "invite"}
                    onClick={() => setActiveTab("invite")}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-h-0 overflow-y-auto">
                  {activeTab === "details" && <EventDetailsTab />}
                  {activeTab === "requirements" && <RequirementsTab />}
                  {activeTab === "invite" && <InviteTab />}
                </div>
              </div>
            </div>
          </div>,
          document.body as HTMLElement
        )}
    </>
  );
};

export default LuckyWheelInfoModal;
