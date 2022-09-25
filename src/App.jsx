/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Tom', phonenum: '80000000',
    time: '2022-09-25',
  },
  {
    id: 2, name: 'Jerry', phonenum: '80000001',
    time: '2022-09-25' ,
  },
  {
    id: 3, name: 'Spike', phonenum: '80000002',
    time: '2022-09-25' ,
  }
];

class ReservedTicket extends React.Component{ 
  componentDidMount() {
    const containers = document.querySelectorAll(".seatEmpty");
    const travellers=this.props.travellers;
    const occupiedSeatNum=travellers.length
    const freeSeatNum=10-occupiedSeatNum
    for(var i=0;i<occupiedSeatNum;i++){
      containers[i].classList.toggle("seatOccupied");
    }
  }
  render(){
    const travellers=this.props.travellers;
    const occupiedSeatNum=travellers.length
    const freeSeatNum=10-occupiedSeatNum
    return (
      <div>
        <div style={{alignItems: 'center', justifyContent: 'space-between',
        flexDirection: 'row', color: "white", fontWeight: "bold"}}>The number of free seats are {freeSeatNum}.
        </div>
        <ul className="showstyle"> 
          <li>
            <div className="seatEmptyori"></div>
            <small>Empty Seat</small>
          </li>
          <li>
            <div className="seatOccupiedori"></div>
            <small>Occupied Seat</small>
          </li>
        </ul>
        <div className="container">
          <div>

          </div>
          <div className="row">
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
          </div>
          <div>

          </div>
          <div className="row">
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
              <div className="seatEmpty"></div>
          </div>
        </div>

      </div>

    );
  }
}

class TravellerRow extends React.Component{
  render() {
    const style = {border: "2px solid silver", padding: 6};
    const traveller=this.props.traveller;
    return (
      <tr>
        <td style = {style}>{traveller.id}</td>
        <td style = {style}>{traveller.name}</td>
        <td style = {style}>{traveller.phonenum}</td>
        <td style = {style}>{traveller.time}</td>
      </tr>
    );
  }
}

class ReservationList extends React.Component{

  render() {
    const rowStyle = {border: "2px solid silver", padding: 6};
    const travellerRows = this.props.travellers.map(traveller => 
      <TravellerRow key={traveller.id} traveller={traveller} />
      );
    
    
    return (
      <table className="showlist" style={{borderCollapse:"collapse", display:"block", textAlign: "center"}} id="del">
        <thead>
          <tr>
            <th style={rowStyle}>Serial No.</th>
            <th style={rowStyle}>Name</th>
            <th style={rowStyle}>Phone number</th>
            <th style={rowStyle}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {travellerRows}
        </tbody>
      </table>

    );
  }
}

class TravellerDel extends React.Component{
  constructor(){
    super();
    this.deleteSubmit=this.deleteSubmit.bind(this);
  }
  deleteSubmit(e) {
    e.preventDefault();
    var tbl=document.getElementById("del");
    const travellers=this.props.travellers;
    const form=document.forms.travellerDel; 
    const objectDel=Number(form.serialno.value)
    if (objectDel > travellers.length) {
      alert("Error:No Such a Traveller.");
    }
    else{

      this.props.deleteTraveller(objectDel-1);
    }
    form.serialno.value="";

    }
  
  render() {
    return (
      <form name="travellerDel" onSubmit={this.deleteSubmit}>
        <input type="index" name="serialno" placeholder="Serial No." />
        <button>Delete</button>
      </form>
    )
  }
}

class TravellerAdd extends React.Component{
  constructor() {
    super();
    this.handleSubmit=this.handleSubmit.bind(this);
    };

  
  handleSubmit(e) {
    e.preventDefault();
    const form=document.forms.travellerAdd;
    const travellers=this.props.travellers;
    const traveller = {
      name: form.name.value, phonenum: form.phonenumber.value, ope: "delete",
      time: form.time.value,
    }
    if(travellers.length < 10){
      this.props.creatTraveller(traveller);
      form.name.value="";
      form.phonenumber.value="";
      form.time.value="";
    }
    else
    {
      alert("Error: No Free Seats!")
    }
  }
  render() {
    return (
      <form name="travellerAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name"/>
        <input type="text" name="phonenumber" placeholder="Phone number"/>
        <input type="text" name="time" placeholder="Time"/>
        <button>Add</button>
      </form>
    );
  }
}

class Homepage extends React.Component{
  constructor() {
    super();
    this.state={ travellers: [], visible: false , getElem: false, 
      addElem: false, delElem: false};
    this.creatTraveller = this.creatTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.clickSubmit=this.clickSubmit.bind(this);
    this.getSubmit=this.getSubmit.bind(this);
    this.addSubmit=this.addSubmit.bind(this);
    this.delSubmit=this.delSubmit.bind(this);

  }

  clickSubmit(e){
    e.preventDefault();
    if(this.state.visible==true) {
      this.setState({ visible: false , getElem:false, addElem:false, delElem:false}) 
    }
    else{
      this.setState({ visible: true , getElem:false, addElem:false, delElem:false}) 
    }
  }

  getSubmit(e){
    e.preventDefault();
    if(this.state.getElem==true) {
      this.setState({ getElem: false, visible: false , addElem:false, delElem:false}) 
    }
    else{
      this.setState({ getElem: true, visible: false , addElem:false, delElem:false}) 
    }
  }

  addSubmit(e){
    e.preventDefault();
    if(this.state.addElem==true) {
      this.setState({ addElem: false, getElem: false, visible: false , delElem:false}) 
    }
    else{
      this.setState({ addElem: true, getElem: false, visible: false , delElem:false}) 
    }
  }

  delSubmit(e){
    e.preventDefault();
    if(this.state.delElem==true) {
      this.setState({ delElem: false ,getElem: false, visible: false , addElem:false}) 
    }
    else{
      this.setState({ delElem: true ,getElem: false, visible: false , addElem:false}) 
    }
  }
 

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers});
    }, 500);
  }

  creatTraveller(traveller) {
    traveller.id = this.state.travellers.length + 1;
    const newTravellerList = this.state.travellers.slice();
    newTravellerList.push(traveller);
    this.setState({travellers: newTravellerList});
  }

  deleteTraveller(index) {
    const newTravellerList = this.state.travellers.slice();
    newTravellerList.splice(index,1);
    for(var j=0;j<newTravellerList.length;j++){
      newTravellerList[j].id= j+1
    }
    this.setState({travellers: newTravellerList});
  }


  
  render(){
    return (
      <React.Fragment>
        <h1>Homepage</h1>
        <nav>
          <button onClick={this.clickSubmit}>FreeSeats</button>
          <button onClick={this.getSubmit}>Reservation List</button>
          <button onClick={this.addSubmit}>Add Traveller</button>
          <button onClick={this.delSubmit}>Delete Traveller</button>
        </nav>
        <hr />
        {this.state.visible ? (
          <ReservedTicket travellers={this.state.travellers}/>
        ) : null}
        <hr />
        {this.state.getElem ? (
          <ReservationList travellers={this.state.travellers} />
        ) : null}
        <hr />
        {this.state.addElem ? (
          <TravellerAdd travellers={this.state.travellers} creatTraveller={this.creatTraveller} />
        ) : null}
        <hr />
        {this.state.delElem ? (
          <TravellerDel travellers={this.state.travellers} deleteTraveller={this.deleteTraveller}/>
        ) : null}
        </React.Fragment>
    );
  }
}

const element = <Homepage />;

ReactDOM.render(element, document.getElementById('contents'));