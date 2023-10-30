import { indicatorTxtObj, years } from "../utilities/createData"

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

import React from "react";

import Select from "react-select"

export default function TimeseriesForm({ startYear, setStartYear, endYear, setEndYear, setTsIndicators, plotOptions, setPlotOptions }) {
    const optionsYears = Object.entries(years).map(([key, value]) => (
        { value: key, label: value }
    ))

    const optionsIndicators = Object.entries(indicatorTxtObj).map(([category, categorizedIndicators]) => ({
        label: category,
        options: Object.entries(categorizedIndicators).map(([indicatorValue, indicatorName]) => ({
            value: indicatorValue,
            label: indicatorName
        }))
    }))

    return (
        <>
            <Form>
                <Row>
                    <Col>
                        <Form.Label> Start year
                            <Select menuPortalTarget={document.body} maxMenuHeight={200} required options={optionsYears} defaultValue={{ value: startYear, label: years[startYear] }} onChange={(e) => setStartYear(e.value)} />
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Label> End year
                            <Select menuPortalTarget={document.body} maxMenuHeight={200} required options={optionsYears} defaultValue={{ value: endYear, label: years[endYear] }} onChange={(e) => setEndYear(e.value)} />
                        </Form.Label>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Form.Label> Indicators
                        <div style={{ width: '250px', margin: '0 auto' }}>
                            <Select menuPortalTarget={document.body} maxMenuHeight={250} isMulti closeMenuOnSelect={false} options={optionsIndicators} placeholder="None Selected" required onChange={(e) => setTsIndicators(e.map((input) => input.value))} />
                        </div>
                    </Form.Label>
                </Row>
                <Row className="justify-content-center">
                    <Button style={{ width: 200 }} variant="primary" onClick={() => setPlotOptions(prevOptions => ({ ...prevOptions, plotting: !prevOptions.plotting }))}>Request Figures</Button>
                </Row>
                <Row>
                    <Form.Label> Change X-axis: 
                        <ToggleButtonGroup type="radio" name="xAxis" defaultValue={1} onChange={() => setPlotOptions({ ...plotOptions, absolute: !plotOptions.absolute })}>
                            <ToggleButton size="sm" id="tbg-axis-1" value={1}>Relative</ToggleButton>
                            <ToggleButton size="sm" id="tbg-axis-2" value={2}>Absolute</ToggleButton>
                        </ToggleButtonGroup>
                    </Form.Label>
                </Row>
                <Row>
                    <Form.Label> Change Graphs: 
                        <ToggleButtonGroup type="radio" name="figures" defaultValue={1} onChange={() => setPlotOptions({ ...plotOptions, combined: !plotOptions.combined })}>
                            <ToggleButton size="sm" id="tbg-figures-1" value={1}>Seperate</ToggleButton>
                            <ToggleButton size="sm" id="tbg-figures-2" value={2}>Combined</ToggleButton>
                        </ToggleButtonGroup>
                    </Form.Label>
                </Row>
            </Form>
        </>
    )
}