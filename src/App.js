import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';



const hcTables = [
  {
    id: uuidv4(),
    title: 'Fall 2021',
    cards: [
      {
        id: uuidv4(),
        courseName: 'COMP 2401'
      },
      {
        id: uuidv4(),
        courseName: 'COMP 2402'
      },
      {
        id: uuidv4(),
        courseName: 'COMP 2404'
      },
      {
        id: uuidv4(),
        courseName: 'COMP 2406'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'Winter 2021',
    cards: [
      {
        id: uuidv4(),
        courseName: 'COMP 3001'
      },
      {
        id: uuidv4(),
        courseName: 'COMP 3005'
      },
      {
        id: uuidv4(),
        courseName: 'COMP 3007'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'Fall 2022',
    cards: [
      {
        id: uuidv4(),
        courseName: 'COMP 4102'
      },
      {
        id: uuidv4(),
        courseName: 'COMP 4203'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'Winter 2022',
    cards: [
      {
        id: uuidv4(),
        courseName: 'COMP 4905'
      }
    ]
  }

];


function App() {
  const[tables, setTables] = useState(hcTables);

  const onDragEnd = result => {
    if(!result.destination) return;
    const {source, destination} = result;
    
    if(source.droppableId !== destination.droppableId) {
      const sourceCards = tables[source.droppableId];
      const destinationCards = tables[destination.droppableId];

      const sourceCard = [...sourceCards.cards];
      const destinationCard = [...destinationCards.cards];

      const [removed] = sourceCard.splice(source.index, 1);
      destinationCard.splice(destination.index, 0, removed);

      tables[source.droppableId].cards = sourceCard;
      tables[destination.droppableId].cards = destinationCard;

      setTables(tables);
      
    }else {
      const table = tables[source.droppableId];
      const sourceCards = [...table.cards];

      const [removed] = sourceCards.splice(source.index, 1);
      sourceCards.splice(destination.index, 0, removed);

      tables[source.droppableId].cards = sourceCards;

      setTables(tables);
    }
  }

  return (
    <div style={{ display:'flex', justifyContent: 'center', height: '100%', backgroundColor: '#383838'}}>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(tables).map(([id, table]) => {
          return (
            <Droppable key={id} droppableId = {id}>
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver ? 'lightblue' : 'grey',
                      padding: 10,
                      width: 270,
                      minHeight: 880,
                      margin: "10px",     
                      borderRadius: '10px'
                    }}
                  >
                    <div
                      style={{
                        color: 'white',
                        fontSize: "32px",
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        userSelect: 'none'
                      }}
                    >
                      {table.title}
                    </div>

                    {table.cards.map((card, index) => {
                      return (
                        <Draggable key={card.id} draggableId={card.id} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  marginTop: "20px",
                                  minHeight: 100,
                                  backgroundColor: '#383838',
                                  ...provided.draggableProps.style,
                                  opacity: snapshot.isDragging ? '0.5' : '1',
                                  borderRadius: '10px'

                                }}
                              >
                                <div
                                  style={{
                                    userSelect: 'none',
                                    padding: 10,
                                    color: 'white',
                                    backgroundColor: '#212121',
                                    borderRadius: '10px'
                                  }}
                                >
                                  {card.courseName}
                                </div>
                              </div>
                            )
                          }}

                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}

            </Droppable>
          )
        })}
      </DragDropContext>

    </div>
  )

}

export default App;
