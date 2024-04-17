import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

interface Assignment {
  _id?: string;
  title: string;
  description: string;
  points: Number;
  dueDate: Date;
  availableFromDate: Date;
  availableUntilDate: Date;
  category:string;
}

const initialState = {
  // assignments: assignments,
  assignments: [] as Assignment[],
  assignment: { title: "New Assignment", description: "New Assignment Description", points: 100, dueDate: '', availableFromDate: '', availableUntilDate: '', category: ''},
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action) => {
      state.assignments = 
        [action.payload, ...state.assignments];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) => {
        if (assignment._id === action.payload._id) {
          return action.payload;
        } else {
          return assignment;
        }
      });
    },
    selectAssignment: (state, action) => {
      state.assignment = action.payload;
    },
  },
});


export const { addAssignment, deleteAssignment,
  updateAssignment, selectAssignment, setAssignments} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;

