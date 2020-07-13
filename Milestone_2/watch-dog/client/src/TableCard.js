import React, {useState, useEffect} from 'react';
import {Table} from 'semantic-ui-react';
import {Label, Button, Accordion, Icon} from 'semantic-ui-react';
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import './TableCard.css';

function TableCard (props) {
  const [columnDefs, setColumnsDefs] = useState ([]);
  const [activeIndex, setActiveIndex] = useState (-1);

  useEffect (
    () => {
      if (props.crimeData.length > 0) {
        var keys = Object.keys (props.crimeData[0]);
        var newCols = [];
        keys.forEach (key => {
          newCols.push ({
            headerName: key,
            field: key,
            sortable: true,
            filter: true,
          });
        });
        setColumnsDefs (newCols);
      }
    },
    [props.crimeData]
  );

  function handleClick (e, titleProps) {
    const {index} = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex (newIndex);
  }

  return (
    <div>
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <div className="tableWrapper">
            <Icon name="dropdown" />
            <h2 className="wrapperHeader">See a detailed table of these</h2>
            <Label color={'blue'} className="wrapperTotal">
              {props.crimeData.length}
            </Label>
            <h2 className="wrapperHeader">incidents</h2>
          </div>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <div style={{maxHeight: '400px'}}>
            <div
              className="ag-theme-alpine"
              style={{height: '100%', width: '100%'}}
            >
              <AgGridReact
                columnDefs={columnDefs}
                pagination={true}
                rowData={props.crimeData}
                domLayout={'autoHeight'}
              />
            </div>
          </div>
        </Accordion.Content>
      </Accordion>
    </div>
  );
}

export default TableCard;
