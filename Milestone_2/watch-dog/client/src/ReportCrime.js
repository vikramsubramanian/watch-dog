/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {Button, Header, Icon, Modal, Form as AForm} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {strEqual, successToast, errorToast} from './utility';
import {Form, Input, Dropdown} from 'semantic-ui-react-form-validator';

const premiseTypeOptions = [
  {key: 'h', text: 'House', value: 'House'},
  {key: 'c', text: 'Commercial', value: 'Commercial'},
  {key: 'ot', text: 'Other', value: 'Other'},
  {key: 'ou', text: 'Outside', value: 'Outside'},
  {key: 'a', text: 'Apartment', value: 'Apartment'},
];

function ReportCrime () {
  const currentDate = new Date ();
  currentDate.setMinutes (0);
  const [modalOpen, setModalOpen] = useState (false);
  const [occurenceDate, setOccurenceDate] = useState (currentDate);
  const [reportedDate, setReportedDate] = useState (currentDate);
  const [crimeIndicator, setCrimeIndicator] = useState ('');
  const [hood, setHood] = useState (null);
  const [premiseType, setPremiseType] = useState ('');
  const [lat, setLat] = useState ('');
  const [long, setLong] = useState ('');
  const [offence, setOffence] = useState (null);

  const [crimeOptions, setCrimeOptions] = useState ([]);
  const [hoodOptions, setHoodOptions] = useState ([]);
  const [offenceOptions, setOffenceOptions] = useState (new Map ());

  function addCrime () {
    // console.log ('adding crime');

    var data = {
      o_date: {
        hour: occurenceDate.getHours (),
        day: occurenceDate.getDate (),
        month: occurenceDate.getMonth () + 1,
        year: occurenceDate.getFullYear (),
        day_of_week: occurenceDate.getDay () + 1,
      },
      r_date: {
        hour: reportedDate.getHours (),
        day: reportedDate.getDate (),
        month: reportedDate.getMonth () + 1,
        year: reportedDate.getFullYear (),
        day_of_week: reportedDate.getDay () + 1,
      },
      crime_id: offenceOptions[crimeIndicator].find (opt =>
        strEqual (opt.value, offence)
      ).db_key,
      hood_id: hoodOptions.find (opt => strEqual (opt.value, hood)).key,
      latitude: parseFloat (lat),
      longitude: parseFloat (long),
      premise_type: premiseType,
    };
    console.log (data);
    fetch ('/report-crime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify (data),
    })
      .then (response => response.json ())
      .then (res => {
        // console.log (res);
        successToast ('Succesfully added to db');
        setModalOpen (false);
      })
      .catch (err => {
        console.log (err);
        errorToast ('Could not add to db');
      });
  }

  useEffect (() => {
    var allHoods = [];
    fetch ('/neighbourhoods')
      .then (response => response.json ())
      .then (res => {
        // console.log (res);
        res.forEach (hood => {
          allHoods.push ({
            key: hood['hood_id'],
            text: hood['name'],
            value: hood['name'],
          });
        });
        setHoodOptions (allHoods);
      })
      .catch (err => {
        console.log (err);
        errorToast ('Could not fetch neighbourhoods');
      });

    var allCrimeTypes = [];
    var offence = new Map ();
    fetch ('/regular-crimes')
      .then (response => response.json ())
      .then (res => {
        // console.log (res);
        res.forEach (crime => {
          if (!allCrimeTypes.find (ct => strEqual (ct.value, crime['MCI']))) {
            allCrimeTypes.push ({
              key: crime['crime_id'],
              text: crime['MCI'],
              value: crime['MCI'],
            });
          }
          var offenceOption = {
            key: crime['offence'],
            text: crime['offence'],
            value: crime['offence'],
            db_key: crime['crime_id'],
            indicator: crime['MCI'],
          };
          if (offence[crime['MCI']]) {
            offence[crime['MCI']].push (offenceOption);
          } else {
            offence[crime['MCI']] = [offenceOption];
          }
        });
        setCrimeOptions (allCrimeTypes);
        setOffenceOptions (offence);
      })
      .catch (err => {
        console.log (err);
        errorToast ('Could not fetch crime indicators');
      });
  }, []);

  return (
    <div>
      <Modal open={modalOpen} onClose={() => setModalOpen (false)}>
        <Modal.Header>Report a Crime</Modal.Header>
        <Modal.Content>

          <Modal.Description>
            <Form onSubmit={addCrime}>
              <AForm.Group widths="equal">
                <Dropdown
                  label="Major Crime Indicator"
                  placeholder="Select indicator"
                  fluid
                  search
                  selection
                  value={crimeIndicator}
                  onChange={(e, {value}) => setCrimeIndicator (value)}
                  validators={['required']}
                  errorMessages={['You must select one option']}
                  options={crimeOptions}
                />
                <Dropdown
                  label="Offence"
                  placeholder="Select offence"
                  fluid
                  search
                  selection
                  value={offence}
                  onChange={(e, {value}) => setOffence (value)}
                  validators={['required']}
                  errorMessages={['You must select one option']}
                  options={
                    offenceOptions &&
                      crimeIndicator &&
                      offenceOptions[crimeIndicator]
                  }
                />
              </AForm.Group>
              <AForm.Group inline>
                <label>Occurence Date and Time</label>
                <DatePicker
                  selected={occurenceDate}
                  onChange={date => setOccurenceDate (date)}
                  showTimeSelect
                  timeIntervals={60}
                  timeFormat="HH:mm"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  maxDate={new Date ()}
                  showDisabledMonthNavigation
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </AForm.Group>
              <AForm.Group inline>
                <label>Reported Date and Time</label>
                <DatePicker
                  selected={reportedDate}
                  onChange={date => setReportedDate (date)}
                  showTimeSelect
                  timeIntervals={60}
                  timeFormat="HH:mm"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  maxDate={new Date ()}
                  showDisabledMonthNavigation
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </AForm.Group>
              <AForm.Group widths="equal">
                <Dropdown
                  label="Neighbourhood"
                  placeholder="Select neighbourhood"
                  fluid
                  search
                  selection
                  value={hood}
                  onChange={(e, {value}) => setHood (value)}
                  validators={['required']}
                  errorMessages={['You must select one option']}
                  options={hoodOptions}
                />
              </AForm.Group>
              <AForm.Group widths="equal">
                <Input
                  type="number"
                  label="Latitude"
                  onChange={(e, {value}) => setLat (value)}
                  value={lat}
                  validators={['required', 'isFloat']}
                  errorMessages={[
                    'this field is required',
                    'field has to be a float',
                  ]}
                />
                <Input
                  type="number"
                  label="Longitude"
                  onChange={(e, {value}) => setLong (value)}
                  value={long}
                  validators={['required', 'isFloat']}
                  errorMessages={[
                    'this field is required',
                    'field has to be a float',
                  ]}
                />
                <Dropdown
                  label="Premise Type"
                  placeholder="Select type"
                  fluid
                  search
                  selection
                  value={premiseType}
                  onChange={(e, {value}) => setPremiseType (value)}
                  validators={['required']}
                  errorMessages={['You must select one option']}
                  options={premiseTypeOptions}
                />
              </AForm.Group>
              {/*
              <Form.Checkbox label="I agree to the Terms and Conditions" /> */}
              <Button primary>
                Proceed <Icon name="chevron right" />
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setModalOpen (false)}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
      <div className="reportCrime">
        <Button secondary onClick={() => setModalOpen (true)}>
          Report Crime
        </Button>
      </div>
    </div>
  );
}

export default ReportCrime;
