import { Badge, Button, Space } from "antd";
import { useEffect, useState } from "react";
import bell from "../../../../../../../public/admin/images/bell.svg";
import no_notification from "../../../../../../../public/admin/images/no-notification.svg";
import doctor1 from "../../../../../../../public/admin/images/doctor1.svg";
import appoint from "../../../../../../../public/admin/images/appoint.svg";
import no_appt from "../../../../../../../public/admin/images/no_appt.svg";
import "./Appointment.css";
import "@/app/assets/css/dashboard.css";
import "./Bell.css";
import Image from "next/image";
const data = [
  {
    key: "1",
    name: "John Doe has requested an appointment with Dr. irfan on July 15, 2023, at 2:00 PM",
    detail: "5 min ago",
  },
  {
    key: "2",
    name: "Bring any relevant medical records, insurance information, or identification documents as requested by your healthcare provider.",
    detail: "5 min ago",
  },
];

const ButtonGroup = Button.Group;
const Appointment = ({
  showDropdown,
  setShowDropdown,
  showDropdown2,
  setShowDropdown2,
}) => {
  const [count, setCount] = useState(data.length);

  const increase = () => {
    setCount(count + 1);
  };
  const decline = () => {
    let newCount = count - 1;
    if (newCount < 0) {
      newCount = 0;
    }
    setCount(newCount);
  };
  // const [showDropdown, setShowDropdown] = useState(false);
  const [cursorClass, setCursorClass] = useState("context-menu");
  const [badgeShow, setBadgeShow] = useState(false);
  useEffect(() => {
    if (data.length > 0) {
      setBadgeShow(true);
    } else {
      setBadgeShow(false);
    }
  }, [badgeShow, data.length]);

  const [width, setWidth] = useState(() => {
    return typeof window !== "undefined" ? window.innerWidth : 0;
  });

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div className="">
        {count && count > 0 ? (
          <Button
            onClick={() => {
              if (showDropdown) {
                setShowDropdown(false);
              } else {
                setShowDropdown(true);
                setShowDropdown2(false);
              }
              // Call the onClose prop here
            }}
            className="shadow-none no-border"
          >
            {count > 0 && badgeShow === true ? (
              <Badge
                size={width < 1295 ? "small" : "large"}
                count={count}
                showZero={true}
                style={{
                  backgroundColor: "rgb(169, 0, 0)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="bell-icon">
                  <Image
                    className="mr-3"
                    src={appoint}
                    width={20}
                    height={20}
                    alt="appointment"
                  />
                </div>
              </Badge>
            ) : (
              <div className="bell-icon mt-2">
                <Image
                  className="mr-3"
                  src={no_appt}
                  width={20}
                  height={20}
                  alt="no_appointment"
                />
              </div>
            )}
          </Button>
        ) : (
          <Image
            className="mr-3 mt-3"
            src={no_appt}
            width={20}
            height={20}
            alt="no_appointment"
          />
        )}

        {showDropdown && (
          <div className="absolute ant-dropdown right-2.5  mt-2  notification-panel appointment-panel-radius bg-white rounded-lg shadow-xl">
            <header className="flex justify-between p-5">
              <div className="">
                <h3 className="font-fam lh-24 fw-700">Appointment Request</h3>
              </div>

              <button
                className="text-primary font-fam lh-24 fw-500"
                onClick={() => {
                  setBadgeShow(false);
                  setCount(0);
                  setShowDropdown(false);
                }}
                onMouseEnter={() => setCursorClass("pointer")}
                onMouseLeave={() => setCursorClass("context-menu")}
              >
                Mark all as read
              </button>
            </header>

            {data.map((value, index) => {
              return (
                <>
                  <div
                    className="hover:bg-gray-200"
                    style={{
                      cursor: `${cursorClass}`,
                    }}
                    onMouseEnter={() => setCursorClass("pointer")}
                    onMouseLeave={() => setCursorClass("context-menu")}
                  >
                    <div className="block  justify-between align-items-center px-4 py-1 ">
                      <div className="notification-text flex align-items-center me-3">
                        <Image
                          className="me-3"
                          src={doctor1}
                          width={45}
                          height={45}
                          alt="Home"
                        />
                        <label className="lh-24 fw-500"> {value.name}</label>
                      </div>
                      <div className="block px-8   hover:bg-gray-200 flex">
                        <div className="notification-detail-text me-3">
                          <label className="lh-24 fw-500 text-primary ml-6">
                            {value.detail}
                          </label>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2  md:mb-7 ml-12  md:w-5/6 ">
                        <Button
                          className="font-fam text-white next btn-primary accept-reject fw-500 fs-16  items-center group-buttons"
                          htmlType="submit"
                        >
                          Accept
                        </Button>

                        <Button className="btn-secondary next group-buttons accept-reject group-buttons  font-fam fs-16 fw-500">
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < data.length - 1 && <hr />}
                </>
              );
            })}
            <footer className="flex footer-bg justify-center  p-5">
              <div
                className="pointer"
                onMouseEnter={() => setCursorClass("pointer")}
                onMouseLeave={() => setCursorClass("context-menu")}
              >
                <p className="font-fam lh-24 fs-16 text-primary fw-500">
                  View All
                </p>
              </div>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
};
export default Appointment;
