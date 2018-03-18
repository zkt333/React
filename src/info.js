import React from 'react';
const style = {
  width:'200px',
  height:'200px',
}
class Info extends React.Component {

   render(){
     return(
       <div style={{display:this.props.style1,marginTop:'40px'}}>
         <table className='details table table-inverse' style={{margin:'auto',width:'80%',color:'white'}}>
           <tr className='phonehidden'>
                    <th></th> 
                    <th>Name</th>
                    <th>Style-Number</th>
                    <th>Active</th>
                    <th>Sell Date</th>
                    <th>Release Type</th>
                    <th>Update Date</th>
                    <th>Restrication</th>
              </tr>
              <tr>
             <td><a href={'https://www.nike.com/launch/t/'+this.props.link} target={'_blank'}><img src={this.props.img} style={style}/></a></td>
                 <td className='align-middle'>{this.props.seotitle}</td>
                 <td className='phonehidden align-middle'>{this.props.stylecode}</td>
                 <td className='phonehidden align-middle'>{this.props.active}</td>
                 <td className='phonehidden align-middle'>{this.props.publishDate}</td>
                 <td className='phonehidden align-middle'>{this.props.createDate}</td>
                 <td className='phonehidden align-middle'>{this.props.updataData}</td>
                 <td className='phonehidden align-middle'>{this.props.restrication}</td>
              </tr>
           </table>
       
       </div>
     )
   }

}

export default Info;