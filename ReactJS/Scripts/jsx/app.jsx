var Root = React.createClass({
    render: function () {
        return (
       
      <div>
        <h2> <HelloWorld name="Nikhil from property" /> </h2>
          <HelloWorld1 url="React/getName" />
        <PagePic pagename={this.props.pagename} />
        <PageLink pagename={this.props.pagename} />
           <TextBoxDisplay />
        <SearchExample items={libraries}/>
          <br />
          <DonationForm/>
      </div>
    
      

    );
    }
});

var PagePic = React.createClass({
    render: function () {
        return (
      <img src={'https://graph.facebook.com/' + this.props.pagename + '/picture'} />
    );
    }
});

var PageLink = React.createClass({
    render: function () {
        return (
      <a href={'https://www.facebook.com/' + this.props.pagename}>
          {this.props.pagename}
      </a>
    );
    }
});

var HelloWorld = React.createClass({
    render: function () {
        return (<div> Hello {this.props.name} </div>)
    },
})
var HelloWorld1 = React.createClass({
    getInitialState: function () {
        return { name: '' };
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            datatype: 'json',
            success: function (data) {
                this.setState(data);
            }.bind(this),
            error: function (xhr, status, error) {
                console.error(this.props.url, status, error.toString());
            }.bind(this)
        });

    },
    render: function () {
        return (<h2><div> Hello {this.state.name}</div> </h2>)
    },


});





var TextBoxDisplay = React.createClass({
    getInitialState: function () {
        return { textData: '' }
    },
    onChange: function (e) {
        this.setState({ textData: e.target.value });
    },
    render: function () {
        return  <div className="topMargin">
            <input type="text" value={this.state.textData} onChange={this.onChange} />
             <div>{this.state.textData}</div>
        </div>;

    }
});


var libraries = [

    { name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/' },
    { name: 'AngularJS', url: 'https://angularjs.org/' },
    { name: 'jQuery', url: 'http://jquery.com/' },
    { name: 'Prototype', url: 'http://www.prototypejs.org/' },
    { name: 'React', url: 'http://facebook.github.io/react/' },
    { name: 'Ember', url: 'http://emberjs.com/' },
    { name: 'Knockout.js', url: 'http://knockoutjs.com/' },
    { name: 'Dojo', url: 'http://dojotoolkit.org/' },
    { name: 'Mootools', url: 'http://mootools.net/' },
    { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/' },
    { name: 'Lodash', url: 'http://lodash.com/' },
    { name: 'Moment', url: 'http://momentjs.com/' },
    { name: 'Express', url: 'http://expressjs.com/' },
    { name: 'Koa', url: 'http://koajs.com/' },

];

var SearchExample = React.createClass({
    getInitialState: function () {
        return { searchString: '' };
    },
    handleChange: function (e) {
        this.setState({ searchString: e.target.value });
    },
    render: function () {
        var libraries = this.props.items,
            searchString = this.state.searchString.trim().toLowerCase();

        if (searchString.length > 0) {
            libraries = libraries.filter(function (l) {
                return l.name.toLowerCase().match(searchString);
            });
        }

        return <div>
                    <h5>Search Text entered in textbox</h5>
                    <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" />
                    <ul>
                       
                        {
                            libraries.map(function (item) {
                                return <li>{item.name} <a href={item.url}>{item.url}</a></li>
                            })
                        }
                    </ul>
           </div>;
    }
});


var DonationForm = React.createClass({
    getInitialState: function () {
        return {
            contributor: "",
            amount: undefined,
            comment: "",
            email: "",
            department: undefined
        };
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var contributor = this.state.contributor.trim();
        var amount = this.state.amount;
        var comment = this.state.comment.trim();
        if (!contributor) {
            return;
        }
        var donation = { email: this.state.email, comment: this.state.comment, contributor: this.state.contributor };
        $.ajax({
            url: "React/PostData",
            datatype: 'json',
            type: 'POST',
            data : donation,
            success: function (data) {
                alert("data posted successfully");
            }.bind(this),
            error: function (xhr, status, error) {
                console.error(this.props.url, status, error.toString());
            }.bind(this)
        });
        this.setState({
            contributor: '',
            amount: undefined,
            comment: '',
            email: '',
            department: undefined
        });
    },
    validateEmail: function (value) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    },
    validateDollars: function (value) {
        var regex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
        return regex.test(value);
    },
    commonValidate: function () {
        return true;
    },
    setValue: function (field, event) {
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
    },
    render: function () {
        return (
          <form onSubmit={this.handleSubmit}>
          <h2>University Donation</h2>
       <label id="lblemail"> Email ID - </label>
        <input type="text"
value={this.state.email}
uniqueName="email"
text="Email Address"
textArea={false}
required={true}
minCharacters={6}
validate={this.validateEmail}
onChange={this.setValue.bind(this, 'email')}
errorMessage="Email is invalid"
emptyMessage="Email is required" />
<br /><br />

<label> Contributor Name - </label>
<input type="text"
value={this.state.contributor}
uniqueName="contributor"
text="Your Name"
required={true}
validate={this.commonValidate}
onChange={this.setValue.bind(this, 'contributor')}
errorMessage="Name is invalid"
emptyMessage="Name is required" />
<br /><br />
   <label> comments - </label>
<input type="text"
value={this.state.comment}
uniqueName="comment"
text="Is there anything you'd like to say?"
required={false}
validate={this.commonValidate}
onChange={this.setValue.bind(this, 'comment')}
errorMessage=""
emptyMessage="" />
<br /><br />
<br />

<input type="submit" value="Submit" />
          </form>
    );
}
});


React.render(
  <Root pagename="Engineering" />,
  document.getElementById('helloContainer')
);