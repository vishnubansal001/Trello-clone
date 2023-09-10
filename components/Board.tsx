"use client";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import React from "react";

function Board() {
    
  return (
    <DragDropContext>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => <div>{}</div>}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
