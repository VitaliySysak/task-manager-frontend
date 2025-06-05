import React from "react";
import { useAppDispatch } from "@/src/store/redux/hooks";
import { calendarRefreshToken } from "@/src/store/auth";
import { useSelector } from "react-redux";
import { selectGoogleAccessToken } from "@/src/store/redux/slices/authSlice";

export const useCalendarRefresh = () => {
  const dispatch = useAppDispatch();

  const googleAccessToken = useSelector(selectGoogleAccessToken);

  React.useEffect(() => {
    const refreshGoogle = async () => {
      if (!googleAccessToken) {
        try {
          await dispatch(calendarRefreshToken()).unwrap();
        } catch (error) {
          console.error("Error while execution use-calendar-login:", error);
        }
      }
    };
    refreshGoogle();
  }, [googleAccessToken]);
};
