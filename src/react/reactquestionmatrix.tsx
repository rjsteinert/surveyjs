﻿/// <reference path="../survey.ts" />
/// <reference path="../question_matrix.ts" />
/// <reference path="../../typings/react/react.d.ts" />
class ReactSurveyQuestionmatrix extends React.Component<any, any> {
    private question: Survey.QuestionMatrixModel;
    protected css: any;
    constructor(props: any) {
        super(props);
        this.question = props.question;
        this.css = props.css;
    }
    componentWillReceiveProps(nextProps: any) {
        this.question = nextProps.question;
        this.css = nextProps.css;
    }
    render(): JSX.Element {
        if (!this.question) return null;
        var firstTH = this.question.hasRows ? <th></th> : null;
        var headers = [];
        for (var i = 0; i < this.question.columns.length; i++) {
            var column = this.question.columns[i];
            var key = "column" + i;
            headers.push(<th key={key}>{column.text}</th>);
        }
        var rows = [];
        var visibleRows = this.question.visibleRows;
        for (var i = 0; i < visibleRows.length; i++) {
            var row = visibleRows[i];
            var key = "row" + i;
            rows.push(<ReactSurveyQuestionmatrixRow key={key} question={this.question} row={row} />);
        }
        return (
            <table className={this.css.root}>
                <thead>
                    <tr>
                        {firstTH}
                        {headers}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
           </table>
        );
    }
}

class ReactSurveyQuestionmatrixRow extends React.Component<any, any> {
    private question: Survey.QuestionMatrixModel;
    private row: Survey.MatrixRowModel;
    constructor(props: any) {
        super(props);
        this.question = props.question;
        this.row = props.row;
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    handleOnChange(event) {
        this.row.value = event.target.value;
        this.setState({ value: this.row.value });
    }
    componentWillReceiveProps(nextProps: any) {
        this.question = nextProps.question;
        this.row = nextProps.row;
    }
    render(): JSX.Element {
        if (!this.row) return null;
        var firstTD = this.question.hasRows ? <td>{this.row.text}</td> : null;
        var tds = [];
        for (var i = 0; i < this.question.columns.length; i++) {
            var column = this.question.columns[i];
            var key = "value" + i;
            var isChecked = this.row.value == column.value;
            var td = <td key={key}><input type="radio" name={this.row.fullName} value={column.value} checked={isChecked} onChange={this.handleOnChange}/></td>;
            tds.push(td);
        }
        return (<tr>{firstTD}{tds}</tr>);
    }
}
