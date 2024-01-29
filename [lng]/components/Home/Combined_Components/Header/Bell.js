import { Badge, Button, Space } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import bell from "../../../../../../../public/admin/images/bell.svg";
import no_notification from "../../../../../../../public/admin/images/no-notification.svg";
import doctor1 from "../../../../../../../public/admin/images/doctor1.svg";
import "./Bell.css";
import Image from "next/image";

// import yourRestaurantImage from "../images/YourRestaurant.png";
// import arrowUpIcon from "../images/DropDown Arrow Up.png";
// import arrowDownIcon from "../images/DropDown Arrow Down.png";

const data = [
  {
    key: "1",
    name: "Please arrive at least 15 minutes prior to your scheduled appointment to complete any necessary paperwork or check-in procedures.",
    detail: "5 min ago",
  },
  {
    key: "2",
    name: "Bring any relevant medical records, insurance information, or identification documents as requested by your healthcare provider.",
    detail: "5 min ago",
  },
];

const ButtonGroup = Button.Group;
const Bell = ({
  showDropdown,
  setShowDropdown,
  showDropdown2,
  setShowDropdown2,
}) => {
  const { push } = useRouter();
  const [count, setCount] = useState(data.length);
  const [lng, setLng] = useState("en");
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
  useEffect(() => {
    const temp = localStorage.getItem("lng");
    setLng(temp);
  }, []);
  //   const [width, setWidth] = useState(window.innerWidth);
  let width = 1400;

  //   useEffect(() => {
  //     const handleResize = () => setWidth(window.innerWidth);
  //     window.addEventListener("resize", handleResize);
  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, []);

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
                    src={bell}
                    width={20}
                    height={20}
                    alt="bell"
                  />
                </div>
              </Badge>
            ) : (
              <div className="bell-icon">
                <Image
                  className="mr-3"
                  src={no_notification}
                  width={20}
                  height={20}
                  alt="no_notification"
                />
              </div>
            )}
          </Button>
        ) : (
          <Image
            className="mr-3 mt-3"
            src={no_notification}
            width={20}
            height={20}
            alt="no_notification"
          />
        )}

        {showDropdown && (
          <div className="absolute ant-dropdown right-2.5  mt-2 appointment-panel-radius notification-panel bg-white  shadow-xl">
            <header className="flex justify-between p-5">
              <div className="">
                <h3 className="font-fam lh-24 fw-700">Notification</h3>
              </div>

              <button
                className="text-primary font-fam lh-24 fw-500"
                onClick={() => {
                  setBadgeShow(false);
                  setCount(0);
                  setShowDropdown(false);
                }}
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
                      <div className="block px-8 py-2  hover:bg-gray-200 flex">
                        <div className="notification-detail-text me-3">
                          <label className="lh-24 fw-500 text-primary ml-6">
                            {value.detail}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  {index < data.length - 1 && <hr />}
                </>
              );
            })}
            <footer className="flex footer-bg justify-center  p-5">
              <div  onClick={() => {
                setShowDropdown(false);
                push(`/${lng}/admin/notifications/bell`);
              }} className="pointer">
                <p className="font-fam lh-24 fs-16 text-primary fw-500">View All</p>
              </div>
            </footer>

          </div>
        )}
      </div>
    </div>
  );
};
export default Bell;
