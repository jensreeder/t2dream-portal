'use strict';
var React = require('react');
var globals = require('../globals');
var item = require('../item');

var ReactForms = require('react-forms');
var Form = ReactForms.Form;
var Scalar = ReactForms.schema.Scalar;


class JSONNode extends ReactForms.schema.ScalarNode {
    serialize(value) {
        return JSON.stringify(value, null, 4);
    }
    deserialize(value) {
        return (typeof value === 'string') ? JSON.parse(value) : value;
    }
}


var FallbackBlockView = React.createClass({
    render: function() {
        var Panel = item.Panel;
        return (
            <div>
            <h2>{this.props.blocktype.label}</h2>
                <Panel context={this.props.value} />
            </div>
        );
    }
});


var FallbackBlockSchema = JSONNode.create({
    label: 'JSON',
    input: <textarea rows="15" cols="80" />,
});


var FallbackBlockEdit = module.exports.FallbackBlockEdit = React.createClass({
    render: function() {
        var schema = this.props.schema || FallbackBlockSchema;
        return this.transferPropsTo(<Form schema={schema} defaultValue={this.props.value} />);
    }
});


// Use this as a fallback for any block we haven't registered
globals.blocks.fallback = function (obj) {
    return {
        label: ','.join(obj['@type']),
        view: FallbackBlockView
    };
};
