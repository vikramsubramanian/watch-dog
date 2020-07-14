/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

const options = [
  {key: 'm', text: 'Male', value: 'male'},
  {key: 'f', text: 'Female', value: 'female'},
  {key: 'o', text: 'Other', value: 'other'},
];

function ReportCrime () {
  const [modalOpen, setModalOpen] = useState (false);
  const [value, setValue] = useState ('');

  return (
    <div>
      <Modal open={modalOpen} onClose={() => setModalOpen (false)}>
        <Modal.Header>Report a Crime</Modal.Header>
        <Modal.Content scrolling>

          <Modal.Description>
            <Form>
              <Form.Group widths="equal">
                <Form.Input fluid label="First name" placeholder="First name" />
                <Form.Input fluid label="Last name" placeholder="Last name" />
                <Form.Select
                  fluid
                  label="Gender"
                  options={options}
                  placeholder="Gender"
                />
              </Form.Group>
              <Form.Group inline>
                <label>Size</label>
                <Form.Radio label="Small" value="sm" checked={value === 'sm'} />
                <Form.Radio
                  label="Medium"
                  value="md"
                  checked={value === 'md'}
                />
                <Form.Radio label="Large" value="lg" checked={value === 'lg'} />
              </Form.Group>
              <Form.TextArea
                label="About"
                placeholder="Tell us more about you..."
              />
              <Form.Checkbox label="I agree to the Terms and Conditions" />
              <Form.Button>Submit</Form.Button>
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
