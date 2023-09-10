import { create } from 'zustand';

interface IDroppableArea {
  isElementInDropArea: boolean;
  droppableZoneYPos: number;
  droppableZonePlateYPos: number;
  updateDroppableZoneYPos: (position: number) => void;
  updateDroppableZonePlateYPos: (position: number) => void;
  setElementInDropAreaStatus: (status: boolean) => void;
}

const useDroppableArea = create<IDroppableArea>(set => ({
  isElementInDropArea: false,
  droppableZoneYPos: -1,
  droppableZonePlateYPos: -1,
  setElementInDropAreaStatus: (status: boolean) => {
    set(state => ({ ...state, isElementInDropArea: status }));
  },
  updateDroppableZoneYPos: (position: number) => {
    set(state => ({ ...state, droppableZoneYPos: position }));
  },
  updateDroppableZonePlateYPos: (position: number) => {
    set(state => ({ ...state, droppableZonePlateYPos: position }));
  },
}));

export default useDroppableArea;
