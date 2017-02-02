import React from 'react';


import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
const { Col, Row } = require('react-flexbox-grid');
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FileInput from 'react-file-input';

import BasicRules from './basic-rules';

import { API_ROOT } from '../../constants'
import API from '../../lib/api'

const raami = new API(`${API_ROOT}raami/`);
var ID = 0

export default class ExhibitReg extends React.Component {

  constructor(props) {
    super(props);
    
    const member = props.params.id

    this.state = {
      id: ID,
      person_id: parseInt(member),
      name: '',
      url:'',
      description:'',
      transport:'',
      continent: '',
      filename:'',
      filedata: null,
      legal: false,
      auction: 0,
      print: 0,
      digital: false,
      agent:'',
      contact:'',
      waitlist: false,
      postage: 0,
      open: false,
      Works: [{ id: null, 
            artist_id: ID, 
            title: '',
            width: 0,
            height: 0, 
            technique: '', 
            orientation: '', 
            filename: '', 
            filedata: null,
            year: '', 
            price: 0, 
            gallery: 0}]

      }


    raami.GET(`people/${member}`).then((data)=>{
      if(data.length > 0 && data[0].id > 0) {
        this.setState(data[0])
        ID = data[0].id
        var _work = this.state.Works.slice();
        _work[0].artist_id = ID
        raami.GET(`works/${ID}`).then(res => {
          console.log(res)
          if('works' in res) {
            res.works.forEach((item) => {
              _work.unshift(item)
              
            })
          this.setState({Works:_work})
          console.log(this.state)
          }
      })

        }
        
      })
        
  }

  handleSubmit(artist) {

    var artist = this.state
    console.log(artist)

    if(this.state.id > 0 ) {
      raami.PUT(`artist/${artist.id}`, artist).then(res=>{
        console.log(res)
      })      
    } else {

      raami.POST('artist', artist).then(res=>{
        console.log(res)
        ID = res.inserted
        this.setState({id:res.inserted})
      })

    }
  }

  submitWork(i) {

    var work = this.state.Works[i]
    
    work.year = parseInt(work.year)
    work.price = parseFloat(work.price)
    work.width = parseFloat(work.width)
    work.height = parseFloat(work.height)
    
    var _id = null

    if(this.state.Works[i].id !== null) {
        _id =  this.state.Works[i].id
    }

    console.log(work)

    if(_id !== null) {
      console.log(work)
      raami.PUT(`work/${_id}`, work).then(res=>{
        console.log(res)

      })      
    } else {
      // delete work.id
      raami.POST('work', work).then(res=>{
        console.log(res)
        var _work = this.state.Works.slice();
        _work[i].id = res.inserted
        this.setState({Works:_work})
      })

    }
  }

  deleteWork(i) {
    if(this.state.Works[i].id) {
      console.log('work/'+this.state.Works[i].id)

        raami.DELETE(`work/${this.state.Works[i].id}`).then(res=>{
          console.log(res)
    
        })
      } else {
        alert('Cant delete nothing!')
      }
  }
  
  addWork() {
    
    var _work = this.state.Works.slice();

      _work.push(
          { id: null, 
            artist_id: this.state.id, 
            title: '',
            width: '',
            height: '', 
            technique: '', 
            orientation: '', 
            filename: '', 
            filedata: null, 
            price: '',
            year: '', 
            gallery: ''}

      )

    this.setState({Works: _work})
    }

  handleWork(i, field, e) {
    var _work = this.state.Works.slice();
    _work[i][field] = e.target.value; 
    this.setState({Works:_work});    
    
  }

  selectWork(i, field, e, key, val) {
      var _work = this.state.Works.slice();
      _work[i][field] = val; 
      this.setState({Works:_work});
    }


  handleChange(field, e) {
    var newState = {}; 
    newState[field] = e.target.value; 
    this.setState(newState);    
    
  }

  handleCheck(field, e, val) {
    var newState = {}; 
    newState[field] = val; 
    this.setState(newState);
  }

  handleSelect(field, e, key, val) {
    var newState = {}; 
    newState[field] = val; 
    this.setState(newState);   
  }

  handleOpen = () => {
    this.setState({open: true});
    event.preventDefault()
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleImage(i, e) {
     // e.preventDefault();

    var reader = new FileReader();
    var file = e.target.files[0];
    reader.onloadend = () => {

          var _work = this.state.Works.slice();
          _work[i]['filename'] = file.name;
          _work[i]['filedata'] = reader.result;
          this.setState({Works:_work});   
      }
    reader.readAsDataURL(file)
    console.log(this.state.Works[i])
    }

  handlePreview(e) {
     // e.preventDefault();

    var reader = new FileReader();
    var file = e.target.files[0];
    reader.onloadend = () => {

      this.setState({
        filename: file.name,
        filedata: reader.result
      });
    }
    reader.readAsDataURL(file)

  }


  render() {



  
  /**** inline styles ****/

  const grey = { 
      color: '#888',
      fontSize: '16px',
      zIndex: '0'
     }

  const label = { 
      color: '#888',
      fontSize: '16px',

     }

  const paper = {
      display: 'inline-block',
      float: 'left',
      padding: '20px'
  }

  const zindex = {
      zIndex: '0',
      position: 'absolute'
  }

  const center = {
    textAlign: 'center'
  }

  /**** calculate costs ****/


  var works = []
  
  this.state.Works.forEach((work, i)=> {

    works.push(
      <Col  key={ i }>
          <Paper style={paper}>
      <Row>
        <Col >
          <TextField  floatingLabelText="Artwork title, year completed" style={{width: '500px' }}
           floatingLabelStyle={label} value={this.state.Works[i].title} onChange={this.handleWork.bind(this, i, 'title')} />
        </Col>
      </Row>
        <Row>
        <Col>
        <label style={label}>Select Gallery </label><br/>
        <SelectField floatingLabelStyle={label} 
          floatingLabelText=""  value={this.state.Works[i].gallery}
          onChange={this.selectWork.bind(this, i, 'gallery')}>
              <MenuItem value={'Auction'} primaryText="Auction gallery" />
              <MenuItem value={'Printshop'} primaryText="Printshop" />
              <MenuItem value={'Digital'} primaryText="Digital galler" />
          </SelectField>
          </Col>
        </Row>

      <Row>
    <Col className="upload">    
    <span style={grey}>Upload image (max 2 MB)</span>
    <br/>
    <span style={zindex} className="upload">
        <FileInput name="work" 
                       accept=".jpg"
                       placeholder="[ Work preview ]" 
                       onChange={this.handleImage.bind(this, i)} />
                       <br/><br/>
        </span><br/>
      {this.state.Works[i].filedata &&
        <img src={this.state.Works[i].filedata} width="250px" />
      }
        </Col>
      </Row>
      <Row>
        <Col >
          <TextField type="number" floatingLabelText="Width"  style={{width: '100px' }} floatingLabelStyle={label} value={this.state.Works[i].width} onChange={this.handleWork.bind(this,  i, 'width')} /> 
        </Col>
          <Col >
          <TextField type="number" floatingLabelText="Height"  style={{width: '100px' }} floatingLabelStyle={label} value={this.state.Works[i].height} onChange={this.handleWork.bind(this,  i,  'height')}/> cm 
        </Col>
      </Row>
        <Row>
        <Col>
      <SelectField floatingLabelStyle={label}
          floatingLabelText="Technique" value={this.state.Works[i].technique}
          onChange={this.selectWork.bind(this, i, 'technique')} >
              <MenuItem value={'Painting'} primaryText="Painting" />
              <MenuItem value={'Drawing'} primaryText="Drawing" />
              <MenuItem value={'Mixed'} primaryText="Mixed media" />
              <MenuItem value={'Photograph'} primaryText="Photograph" />
              <MenuItem value={'Digital'} primaryText="Digital" />
              <MenuItem value={'3D'} primaryText="3D (ie. sculpture)" />
          </SelectField>
          </Col>
        </Row>
        <Row>
        <Col>
      <SelectField
          floatingLabelText="Display" floatingLabelStyle={label}
          onChange={this.selectWork.bind(this, i, 'orientation')}  value={this.state.Works[i].orientation}>
              <MenuItem value={'Table'} primaryText="Table-top display" />
              <MenuItem value={'Wall'} primaryText="Wall mounted" />
          </SelectField>
          </Col>
        </Row>
      <Row>
       <Col>
          <FlatButton type="submit" label="Save" onClick={this.submitWork.bind(this, i)} className="button-submit" primary={true} />
          <FlatButton type="submit" label="Delete" onClick={this.deleteWork.bind(this, i)} className="button-submit" secondary={true} />
          
        </Col>
        </Row>
        </Paper> 
        </Col>
    )
  })

  // console.log(this.state.Works.length+1)

  var total = this.state.auction*20+this.state.print*10+(this.state.digital ? 20 : 0)+(this.state.postage > 0 ? parseInt(this.state.postage) + 20 : 0 )

    return (
      <form novalidate >
  <Card>
  <CardHeader>
  <h2>Worldcon 75 Art Show Registration Form</h2>
  <div sx={6} style = {center}>
  <i>Please fill in the general fields to register to the W75 art show. 
  You can edit and fill the details concerning individual art works also later. <br/>
  The fee is a preliminary estimate and may change. Payment will be due in April latest. 
  Changes and additions to this form will be notified by email.</i></div>
  </CardHeader>
  <CardText>
  <Row>
    <Col>
      <TextField  floatingLabelText="Artist name" style={{width: '500px' }}
      floatingLabelStyle={label} value={this.state.name} 
      onChange={this.handleChange.bind(this, 'name')} />
    </Col>
  </Row>
    <Row>
    <Col>
      <TextField  style={{width: '500px' }} 
      floatingLabelText="Website URL" 
      floatingLabelStyle={label} onChange={this.handleChange.bind(this, 'url')} value={this.state.url} />
    </Col>
  </Row>
  <Row>
    <Col>
      <TextField floatingLabelText="Short description for catalogue/website (500 characters)" style={{width: '500px' }}
      floatingLabelStyle={label} id="description" floatingLabelStyle={label} value={this.state.description} onChange={this.handleChange.bind(this, 'description')} multiLine={true} rows={5}/>
    </Col>
    </Row>
  <Row>
  <Col>
  <SelectField
      floatingLabelText="Continent for tax purposes" floatingLabelStyle={label}
      onChange={this.handleSelect.bind(this, 'continent')} value={this.state.continent}>
          <MenuItem value={'EU'} primaryText="EU" />
          <MenuItem value={'NON-EU'} primaryText="NON-EU" />
      </SelectField>
      </Col>
    </Row>
  <Row>
  <Col>
  <SelectField
      floatingLabelText="Select Transportation method" floatingLabelStyle={label}
      onChange={this.handleSelect.bind(this, 'transport')} value={this.state.transport}>
            <MenuItem value={'Air mail'} primaryText="Air mail" />
            <MenuItem value={'Courier'} primaryText="Courier" />
            <MenuItem value={'Self'} primaryText="Deliver self" />
      </SelectField>
      <br />
      </Col>
    </Row>
    <Row>
    <Col >
      <TextField  floatingLabelText="Delivery contact" style={{width: '500px' }}
       floatingLabelStyle={label} onChange={this.handleChange.bind(this, 'agent')} value={this.state.agent} />
    </Col>
  </Row>

    <Row>
    <Col>
      <h3>Reserve Gallery Space</h3>
    </Col>
    </Row>
    <Row>
    <Col sm={6}>
      <label style={label}>Auction gallery </label>
        <TextField type="number" floatingLabelStyle={label} style={{width: '100px' }} floatingLabelText="" min="0" onChange={this.handleChange.bind(this, 'auction')} value={this.state.auction}/> m      
      </Col>
      </Row>
      <Row>
    <Col sm={6}>
           <label style={label}>Printshop gallery</label>
      <TextField type="number" floatingLabelStyle={label} style={{width: '100px' }} floatingLabelText="" min="0" onChange={this.handleChange.bind(this, 'print')} value={this.state.print} /> m
     </Col>
    </Row>
    <Row>
    <Col sm={6}>
    <Checkbox label="Digital gallery (Max 20 works)" labelPosition="left" labelStyle={grey} floatingLabelStyle={label}
      onCheck={this.handleCheck.bind(this,'digital')} checked={this.state.digital} />
          <br/><br/>

    </Col>
    </Row>
    <Row>
    <Col xs={2}>
    <label style={label} >Total Cost of This Submission </label>
    </Col>
    <Col xs={4}>
    <TextField type="number" style={{width: '100px' }}
     name="total" value={total} /> &euro;
    </Col>
    </Row>
    <Row>
    <Col xs={2}>
    <label style={label} >Estimated Return Postage (plus 20 &euro; for handling) </label>
    </Col>
    <Col xs={4}>
    <TextField type="number" name="postage" style={{width: '100px' }} value={this.state.postage} onChange={this.handleChange.bind(this, 'postage')} /> &euro;
    </Col>
    </Row>

    <Row>
    <Col xs={4}>
              <br/><br/>

      <Checkbox label="If the art show is full then I would like to go on the waiting list." labelPosition="left" labelStyle={grey}
      onCheck={this.handleCheck.bind(this, 'waitlist')} checked={this.state.waitlist} />
    </Col>
  </Row>

      <Row>
        <Col xs={12} sm={3}><br /><br />
      <RaisedButton type="submit" label="Save"
      disabled={ !this.state.legal } 
      className="button-submit" onClick={this.handleSubmit.bind(this)} primary={true} />
      </Col>
          <Col ><br /><br />
      <a href="javascript:void(0);" onClick={ this.handleOpen } style={grey}>Accept Basic Rules</a>
      <Checkbox onCheck={this.handleCheck.bind(this,'legal')} checked={this.state.legal} />
      <Dialog
          title="By ticking this box I will accept the W75 Accept Basic rules"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent = {true}
        >
        <BasicRules />

        </Dialog>
    </Col>
      </Row>
      <Row>
      <Col xs={12}>
      < br/>
      <Divider />
            <h3>Submitted Artworks </h3>
            <div xs={6} style= { center } >
            <i>Please fill fields to submit individual artworks to the art show. <br/>
            You may edit submitted artworks and their details at later date.</i></div>
            <br/>
          </Col>
      </Row>
      <Row>
        { works }

        <Col xs= {12} >
        <br />
        <RaisedButton type="button" label="Add" onClick={this.addWork.bind(this)} className="button-submit" />
        </Col>
        </Row>
      </CardText>
  </Card>
  </form>
      )
  };
}
