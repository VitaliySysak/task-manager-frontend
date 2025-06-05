import React from "react";
import { cn } from "@/src/lib/utils";
import { GoogleButton } from "../ui/google-button";
import { useCalendarRefresh } from "@/src/hooks/use-calendar-refresh";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTaskForm,
  setTaskDescription,
  toggleTaskIsGoogleEvent,
} from "@/src/store/redux/slices/tasksSlice";
import TimeInput from "../ui/time-input";
import { GoogleCheckbox } from "../ui/google-checkbox";
import { useGoogleCalendarForm } from "@/src/hooks/use-calendar-form";
import { Skeleton } from "../ui/skeleton";

interface FormData {
  title: string;
  description: string;
  isCompleted: boolean;
  showDrawer: boolean;
}

interface Props {
  className?: string;
  formData: FormData;
}

export const TodoDrawer: React.FC<Props> = ({ className, formData }) => {
  const dispatch = useDispatch();
  const taskForm = useSelector(selectTaskForm);

  useCalendarRefresh();

  const { googleAccessToken, loading, defaultTime, onStartTimeChange, onEndTimeChange } =
    useGoogleCalendarForm();

  return (
    <div className="absolute top-36 sm:top-43 2xl:top-57 h-[385px] sm:h-[385px] 2xl:h-[481px] rounded-md w-full px-4 sm:px-8 py-4 bg-[var(--very-dark-desaturated-blue)] text-white">
      <label htmlFor="description" className="block mb-2 text-sm sm:text-base">
        Add a description:
      </label>
      <textarea
        id="description"
        value={formData.description}
        onChange={(e) => dispatch(setTaskDescription(e.target.value))}
        className="w-full p-2 rounded bg-[var(--very-dark-grayish-blue)] text-white max-h-[400px] focus:outline-none"
        rows={3}
        placeholder="Write more details about your task..."
      />
      {!loading && !googleAccessToken ? (
        <div className="flex flex-col justify-center items-center">
          <GoogleButton type="calendar" className="mt-4" />
        </div>
      ) : loading ? (
        <div>
          <Skeleton className="w-full h-20 mt-4" />
          <div className="flex gap-4">
            <Skeleton className="w-56 h-10 mt-4" />
            <Skeleton className="w-56 h-10 mt-4" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <GoogleCheckbox
            checked={taskForm.isGoogleEvent}
            onChange={() => dispatch(toggleTaskIsGoogleEvent())}
            className="mt-4"
          />
          <div className="flex flex-col md:flex-row">
            <TimeInput label="start event time" onChange={onStartTimeChange} />
            <TimeInput label="end event time" value={defaultTime.endEventTime} onChange={onEndTimeChange} />
          </div>
        </div>
      )}
    </div>
  );
};
