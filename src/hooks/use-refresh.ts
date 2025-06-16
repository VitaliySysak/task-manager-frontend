import React from "react";
import { useAppDispatch } from "@/src/store/redux/hooks";
import { setTasksloading } from "@/src/store/redux/slices/tasksSlice";
import { refreshToken } from "@/src/store/auth";
import { useSelector } from "react-redux";
import { selectAccessToken, setIsLoggedIn } from "@/src/store/redux/slices/authSlice";
import { getUserTasks } from "@/src/store/tasks";

export const useRefresh = () => {
  const dispatch = useAppDispatch();
  const accessToken = useSelector(selectAccessToken);

  React.useEffect(() => {
    const fetchTasksOrRefresh = async () => {
      if (accessToken) {
        dispatch(getUserTasks());
      } else {
        try {
          dispatch(setTasksloading(true));
          await dispatch(refreshToken()).unwrap();
        } catch (error) {
          dispatch(setIsLoggedIn(false));
        }
      }
    };
    fetchTasksOrRefresh();
  }, [accessToken]);
};
