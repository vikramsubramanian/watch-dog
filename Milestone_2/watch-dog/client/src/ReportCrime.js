/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {Button, Header, Icon, Modal, Form} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const premiseTypeOptions = [
  {key: 'h', text: 'House', value: 'House'},
  {key: 'c', text: 'Commercial', value: 'Commercial'},
  {key: 'o', text: 'Other', value: 'other'},
];

function ReportCrime () {
  const [modalOpen, setModalOpen] = useState (false);
  const [startDate, setStartDate] = useState (new Date ().setMinutes (0));
  const [hoodOptions, setHoodOptions] = useState ([]);

  useEffect (() => {
    var allHoods = [];
    fetch ('/neighbourhoods')
      .then (response => response.json ())
      .then (res => {
        console.log (res);
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
      });
  }, []);

  return (
    <div>
      <Modal open={modalOpen} onClose={() => setModalOpen (false)}>
        <Modal.Header>Report a Crime</Modal.Header>
        <Modal.Content>

          <Modal.Description>
            <Form>
              <Form.Group inline>
                <label>Occurence Date and Time</label>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate (date)}
                  showTimeSelect
                  timeIntervals={60}
                  timeFormat="HH:mm"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </Form.Group>
              <Form.Group inline>
                <label>Reported Date and Time</label>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate (date)}
                  showTimeSelect
                  timeIntervals={60}
                  timeFormat="HH:mm"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label="Neighbourhood"
                  options={hoodOptions}
                  placeholder="Neighbourhood"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input fluid label="Latitude" placeholder="Latitude" />
                <Form.Input fluid label="Longitude" placeholder="Longitude" />
                <Form.Select
                  fluid
                  label="Premise Type"
                  options={premiseTypeOptions}
                  placeholder="Premise Type"
                />
              </Form.Group>

              <Form.Checkbox label="I agree to the Terms and Conditions" />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Proceed <Icon name="chevron right" />
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
