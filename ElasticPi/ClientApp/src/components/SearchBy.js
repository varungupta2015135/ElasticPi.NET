﻿import React, { Component } from 'react';
import { SearchBar } from './SearchBar';

export class SearchBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false, selectedValue: "", selectedId: "", data: [], loading: true, url: 'api/search/getby', paramFieldUrl: "", chosenValue: "", selectedValueArray: [], selectedIdArray: [],
            systemGuid: "", sensorId: "", organizationId: "", occupancyValue: ""
        }
    }

    handleSelect = (event) => {
        var newValueArray = [];
        var newIdArray = [];
        if (event.target.checked) {
            console.log("checked");
            newValueArray = this.state.selectedValueArray;
            newValueArray.push(event.target.value);
            newIdArray = this.state.selectedIdArray;
            newIdArray.push(event.target.id);
        }
        else {
            console.log("unchecked");
            var index = this.state.selectedValueArray.indexOf(event.target.value);
            newValueArray = this.state.selectedValueArray;
            newIdArray = this.state.selectedIdArray;
            if (index > -1) {
                newValueArray.splice(index, 1);
                if (newIdArray[index] === "sensorId") 
                    this.setState({ sensorId: "" })
                if (newIdArray[index] === "organizationId")
                    this.setState({ organizationId: "" })
                if (newIdArray[index] === "systemGuid")
                    this.setState({ systemGuid: "" })
                if (newIdArray[index] === "occupancyValue")
                    this.setState({ occupancyValue: "" })
                newIdArray.splice(index, 1);
            }
        }
        this.setState({
            selectedValueArray: newValueArray,
            selectedIdArray: newIdArray
        });
    }

    handleCheckedFieldValue = (event) => {
        if (event.target.id === "systemGuid") {
            this.setState({
                systemGuid: event.target.id + "=" + event.target.value
            });
        }
        if (event.target.id === "sensorId") {
            this.setState({
                sensorId: event.target.id + "=" + event.target.value
            });
        }
        if (event.target.id === "organizationId") {
            this.setState({
                organizationId: event.target.id + "=" + event.target.value
            });
        }
        if (event.target.id === "occupancyValue") {
            this.setState({
                occupancyValue: event.target.id + "=" + event.target.value
            });
        }
    }

    fetchedData = (data) => {
        this.setState({
            data: data
        });
    }

    loadingData = (status) => {
        this.setState({
            loading: status
        });
    }

    resetData = (status) => {
        if (status === "true") {
            this.setState({
                paramFieldUrl: "",
                chosenValue: ""
            });
        }
    }

    static renderSearchTable(data) {
        var i = 0;
        return (
            <table className='table table-striped table-bordered text-center' id="grid" style={{ marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>System GUID</th>
                        <th>Organization ID</th>
                        <th>Sensor ID</th>
                        <th>Occupancy Value</th>
                        <th>Capture Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(result =>
                        <tr key={i++}>
                            <td>{result.systemGuid}</td>
                            <td>{result.organizationId}</td>
                            <td>{result.sensorId}</td>
                            <td>{result.occupancyValue}</td>
                            <td>
                                {result.captureTime.split('T')[0].substr(6, 2) + "/" +
                                    result.captureTime.split('T')[0].substr(4, 2) + "/" +
                                    result.captureTime.split('T')[0].substr(0, 4) + "--" +
                                    result.captureTime.split('T')[1].substr(0, 2) + ":" +
                                    result.captureTime.split('T')[1].substr(2, 2) + ":" +
                                    result.captureTime.split('T')[1].substr(4, 2) + " hrs"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    render() {
        let contents = this.state.loading ? <p style={{ marginTop: '10px' }}><em>Data will appear here</em></p> : (this.state.data.length > 0) ? SearchBy.renderSearchTable(this.state.data) : <p style={{ marginTop: '10px' }}><em>No results found. Please check your query</em></p>;
        return (
            <div>
                <h2>Search By</h2>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="systemGuid" id="systemGuid" value="System GUID" onChange={this.handleSelect} />
                    <label class="form-check-label" for="systemGuid">
                        System GUID
                        </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="organizationId" id="organizationId" value="Organization ID" onChange={this.handleSelect} />
                    <label class="form-check-label" for="organizationId">
                        Organization ID
                        </label>
                </div>
                <div class="form-check disabled">
                    <input class="form-check-input" type="checkbox" name="sensorId" id="sensorId" value="Sensor ID" onChange={this.handleSelect} />
                    <label class="form-check-label" for="sensorId">
                        Sensor ID
                        </label>
                </div>
                <div class="form-check disabled">
                    <input class="form-check-input" type="checkbox" name="occupancyValue" id="occupancyValue" value="Occupancy Value" onChange={this.handleSelect} />
                    <label class="form-check-label" for="occupancyValue">
                        Occupancy Value
                        </label>
                </div>
                <div className="form-group">
                    {this.state.selectedValueArray && this.state.selectedValueArray.length > 0 ? this.state.selectedValueArray.map((res, i) => (<div key={res}>{res}<input type="text" id={this.state.selectedIdArray[i]} className="form-control" onChange={this.handleCheckedFieldValue} name={res} value={this.state.chosenArrayFieldValue}/></div>)) : ""}
                </div>
                <SearchBar fetchUrlBeginning={this.state.url} fetchedData={this.fetchedData} loadingData={this.loadingData} resetData={this.resetData} sensorId={this.state.sensorId} organizationId={this.state.organizationId} systemGuid={this.state.systemGuid} occupancyValue={this.state.occupancyValue}/>
                {contents}
            </div>
        )
    }
}