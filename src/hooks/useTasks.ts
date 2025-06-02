import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/src/store/redux/hooks";
import { setTasksloading } from "@/src/store/redux/slices/tasksSlice";
import { refreshToken } from "@/src/store/auth";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/store/redux/slices/authSlice";
import { getUserTasks } from "@/src/store/tasks";

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
          navigate("/auth");
        }
      }
    };
    fetchTasksOrRefresh();
  }, [accessToken]);
};
