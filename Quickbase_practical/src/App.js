import React, {Component} from "react";
import './App.css';
import TextInput from "./components/TextInput";
import TypeInput from "./components/TypeInput";
import ChoiceInput from "./components/ChoiceInput";
import OrderInput from "./components/OrderInput";
import ErrorValidationLabel from "./components/ErrorValidationLabel";
import MockService from "./js/MockService";
import {isEmpty} from "lodash";
import * as constants from "./common/Constants";
import * as messages from "./common/Messages";
import Button from "./components/Button";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelVal: {
                value: "",
                valid: true,
                errorMessage: "",
                fieldName: "Label",
                identifier: constants.FIELD_IDENTIFIER_LABEL,
                required: true
            },
            defaultVal: {
                value: "",
                valid: true,
                errorMessage: "",
                fieldName: "Default Value",
                identifier: constants.FIELD_IDENTIFIER_DEFAULT_VALUE,
                required: true
            },
            typeVal: {
                value: false,
                valid: true,
                errorMessage: "",
                fieldName: "Type",
                identifier: constants.FIELD_IDENTIFIER_TYPE,
                required: true
            },
            choicesVal: {
                value: "",
                valid: true,
                errorMessage: "",
                fieldName: "Choices",
                identifier: constants.FIELD_IDENTIFIER_CHOICE,
                required: true
            },
            orderVal: {
                value: "ASC",
                valid: true,
                errorMessage: "",
                fieldName: "Order",
                identifier: constants.FIELD_IDENTIFIER_ORDER,
                required: true
            }
        };
    }

// Create Event Handler for Each Components

    onChangeLabelVal = e => {
        // console.log("Object destruction" )
        // console.log(...this.state)
        const {labelVal} = {...this.state};
        labelVal.value = e.target.value;
        labelVal.valid = true;
      //  console.log("Object destructuring" )
        console.log(labelVal);

        this.setState({
            labelVal: labelVal
        });
    };

    onChangeDefaultVal = e => {
        console.log(e.target.value);
        const {defaultVal} = {...this.state};
        defaultVal.value = e.target.value;
        defaultVal.valid = true;
        this.setState({
            defaultVal: defaultVal
        });
    };

    onChangeTypeVal = e => {
        console.log(e.target.value);
        const {typeVal} = {...this.state};
        typeVal.value = e.target.checked;
        this.setState({
            typeVal: typeVal
        });
    };

    onChangeChoicesVal = e => {
        console.log(e.target.value);
        const {choicesVal} = {...this.state};
        choicesVal.value = e.target.value;
        choicesVal.valid = true;
        this.setState({
            choicesVal: choicesVal
        });
    };

    onChangeOrderVal = e => {
        const {orderVal} = {...this.state};
        orderVal.value = e.target.value;
        this.setState({
            orderVal: orderVal
        });
    };

    onCancel = e => {
        // Reset state
        const {labelVal, defaultVal, typeVal, choicesVal, orderVal} = {...this.state};
        labelVal.value = "";
        labelVal.valid = true;
        labelVal.errorMessage = "";
        defaultVal.value = "";
        defaultVal.valid = true;
        defaultVal.errorMessage = "";
        typeVal.value = false;
        typeVal.valid = true;
        typeVal.errorMessage = "";
        choicesVal.value = "";
        choicesVal.valid = true;
        choicesVal.errorMessage = "";
        orderVal.value = "";
        orderVal.valid = true;
        orderVal.errorMessage = "";

        this.setState({
            labelVal: labelVal,
            defaultVal: defaultVal,
            typeVal: typeVal,
            choicesVal: choicesVal,
            orderVal: orderVal
        });
    };


 // Get The Choices List in array by spliting it by "\n"   

    getChoicesList = (choices_input, compareLowerCase) => {
        if (isEmpty(choices_input))
            return [];

        return choices_input
            .split(constants.CHOICES_DELIMITER)
            .filter(val => !isEmpty(val))
            .map(val => compareLowerCase ? val.toLowerCase(): val);
    };


    // Consturct JSON which is going to be submitted 
    getSubmitJSON = () => {
        const result = {};

        //Add the values from the form fields
        result[constants.JSON_KEY_LABEL] = this.state.labelVal.value;
        // result[constants.JSON_KEY_REQUIRED] = this.state.typeVal.value;
        result[constants.JSON_KEY_MULTI_SELECT] = this.state.typeVal.value;
        result[constants.JSON_KEY_DISPLAY_Alpha] = this.state.orderVal.value.toLowerCase() === "ASC".toLowerCase();
        result[constants.JSON_KEY_DEFAULT] = this.state.defaultVal.value;
        result[constants.JSON_KEY_CHOICES] = this.getChoicesList(this.state.choicesVal.value,false);

        return result;
    };


    // Define the common method to reset the state of valid and ErrorMessage 
    resetPropObject = (prop_object) => {
        prop_object.valid = true;
        prop_object.errorMessage = "";
        return prop_object;
    };

    // check for the invalid field
    validateAllFields = (state_obj) => {
        return Object.keys(state_obj)
            .map(key => state_obj[key])
            .filter(objectProps => !objectProps.valid);
    };

    // check the validation before onSubmit
    getValidatedState = () => {
        const existingState = {...this.state};
        const result = Object.keys(existingState)
            .map(prop => {
                var obj = existingState[prop];
                switch (obj.identifier) {
                    case constants.FIELD_IDENTIFIER_LABEL:
                        this.resetPropObject(obj);
                        if (isEmpty(obj.value)) {
                            obj.valid = false;
                            obj.errorMessage = messages.LABEL_REQUIRED;
                        }
                        return obj;
                    case constants.FIELD_IDENTIFIER_DEFAULT_VALUE:
                        return obj;
                    case constants.FIELD_IDENTIFIER_TYPE:
                        return obj;
                    case constants.FIELD_IDENTIFIER_CHOICE:
                        this.resetPropObject(obj);
                        const choices_array = this.getChoicesList(obj.value,true);
                        const choices_set = new Set(choices_array);
                        if (choices_array.length !== choices_set.size) {
                            obj.valid = false;
                            obj.errorMessage = messages.CHOICES_DUPLICATE_ENTRIES;
                        } else if (choices_array.length > constants.MAX_CHOICES_LIMIT) {
                            obj.valid = false;
                            obj.errorMessage = messages.CHOICES_LENGTH_EXCEEDED;
                        }

                        // Add default value to choices if not already present and there is space for one item
                        const defaultValue = existingState[constants.FIELD_KEY_DEFAULT_VALUE];
                        if(!isEmpty(defaultValue) && !isEmpty(defaultValue.value)
                            && choices_array.length < constants.MAX_CHOICES_LIMIT){

                            if(choices_array.filter((item, index) => item.toLowerCase()===defaultValue.value.toLocaleLowerCase()).length === 0){
                                choices_array.push(defaultValue.value);
                                obj.value = choices_array.join("\n");
                            }
                        }
                        return obj;
                    case constants.FIELD_IDENTIFIER_ORDER:
                        return obj;
                    default:
                        return obj;
                }
            })
            .reduce((result_obj, current_element) => {
                switch (current_element.identifier) {
                    case constants.FIELD_IDENTIFIER_LABEL:
                        result_obj[constants.FIELD_KEY_LABEL] = current_element;
                        break;
                    case constants.FIELD_IDENTIFIER_DEFAULT_VALUE:
                        result_obj[constants.FIELD_KEY_DEFAULT_VALUE] = current_element;
                        break;
                    case constants.FIELD_IDENTIFIER_TYPE:
                        result_obj[constants.FIELD_KEY_TYPE] = current_element;
                        break;
                    case constants.FIELD_IDENTIFIER_CHOICE:
                        result_obj[constants.FIELD_KEY_CHOICE] = current_element;
                        break;
                    case constants.FIELD_IDENTIFIER_ORDER:
                        result_obj[constants.FIELD_KEY_ORDER] = current_element;
                        break;
                    default:
                        break;
                }
                return result_obj;
            }, {});
        return result;
    };


    // 
    onSubmit = e => {
        e.preventDefault();
        const validatedState = this.getValidatedState();
        if (isEmpty(this.validateAllFields(validatedState))) {
            const submitJSON = this.getSubmitJSON();
            console.log(submitJSON);
            MockService.saveField(submitJSON).then(response => console.log(response));
            alert('Field Saved Successfully');
        }
        this.setState(validatedState);
    };

    // Display the  Error if the state of field is invalid  
    getErrorValidationComponent = obj => {
        return obj.valid ? ("") : (<ErrorValidationLabel
            errorMessage={obj.errorMessage}
        />);
    };

    render() {
        const {labelVal, typeVal, defaultVal, choicesVal, orderVal} = this.state;

        const renderLabelValidationError = this.getErrorValidationComponent(labelVal);
        const renderDefaultValidationError = this.getErrorValidationComponent(defaultVal);
        const renderTypeValidationError = this.getErrorValidationComponent(typeVal);
        const renderChoiceValidationError = this.getErrorValidationComponent(choicesVal);
        const renderOrderValidationError = this.getErrorValidationComponent(orderVal);

        return (
            <div className={"m-4"}>
                <div className="container">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">{constants.PANEL_HEADER}</h3>
                        </div>
                        <div className="panel-body mt-4">
                            <form onSubmit={this.onSubmit}>
                                <div className={""}>
                                    <TextInput labelText={this.state.labelVal.fieldName}
                                               required={this.state.labelVal.required}
                                               value={this.state.labelVal.value}
                                               onChange={this.onChangeLabelVal}/>
                                    {renderLabelValidationError}
                                    <TypeInput labelText={this.state.typeVal.fieldName}
                                               checked={this.state.typeVal.value}
                                               checkboxText={"Multi-select"} onChange={this.onChangeTypeVal}/>
                                    {renderDefaultValidationError}
                                    <TextInput labelText={this.state.defaultVal.fieldName}
                                               value={this.state.defaultVal.value}
                                               onChange={this.onChangeDefaultVal}/>
                                    {renderTypeValidationError}
                                    <ChoiceInput labelText={this.state.choicesVal.fieldName}
                                                 value={this.state.choicesVal.value}
                                                 onChange={this.onChangeChoicesVal}/>
                                    {renderChoiceValidationError}
                                    <OrderInput labelText={this.state.orderVal.fieldName}
                                                value={this.state.orderVal.value}
                                                onChange={this.onChangeOrderVal} optionsArray={constants.OPTIONS_ARRAY}/>
                                    {renderOrderValidationError}
                                </div>
                                <div className={"row mt-4"}>
                                    <div className="col-sm-3"></div>
                                    <div className={"col-sm-9"}>
                                        <Button cssClassName={"btn btn-success"} onClick={this.onSubmit} caption={"Submit"} captionClassName={""}/>
                                        <span className={"m-4"}>Or</span>
                                        <Button cssClassName={"btn"} onClick={this.onCancel} caption={"Cancel"} captionClassName={"text-danger"}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
