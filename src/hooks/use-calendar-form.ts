import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/redux/store";
import { setTaskTimeStart, setTaskTimeEnd } from "@/src/store/redux/slices/tasksSlice";
import dayjs, { Dayjs } from "dayjs";

export const useGoogleCalendarForm = () => {
  const dispatch = useDispatch();
  const { googleAccessToken, loading } = useSelector((state: RootState) => state.auth);

  const [defaultTime, setDefaultTime] = useState<{
    startEventTime: Dayjs | null;
    endEventTime: Dayjs | null;
  }>({
    startEventTime: null,
    endEventTime: null,
  });

  const onStartTimeChange = (value: Dayjs | null) => {
    if (!value) return;

    const newStart = value;
    const newEnd = value.add(1, "hour");

    setDefaultTime({
      startEventTime: newStart,
      endEventTime: newEnd,
    });

    dispatch(setTaskTimeStart(newStart.toISOString()));
    dispatch(setTaskTimeEnd(newEnd.toISOString()));

    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 50);
  };

  const onEndTimeChange = (value: Dayjs | null) => {
    if (!value) return;

    setDefaultTime((prev) => ({ ...prev, endEventTime: value }));
    dispatch(setTaskTimeEnd(value.toISOString()));

    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 50);
  };

  return {
    googleAccessToken,
    loading,
    defaultTime,
    onStartTimeChange,
    onEndTimeChange,
  };
};
