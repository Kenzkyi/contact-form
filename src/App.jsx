import React, { useEffect, useState } from 'react'
import radioIcon from './assets/images/icon-radio-selected.svg'
import checkIcon from './assets/images/icon-checkbox-check.svg'
import markIcon from './assets/images/icon-success-check.svg'

const App = () => {
  const [all,setAll] = useState({
    firstName: '',
    lastName: '',
    email: '',
    general: false,
    support: false,
    message: '',
    checkbox: false
  })

  const [error,setError] = useState({
    firstName: 'This field is required',
    lastName: 'This field is required',
    email: 'Please enter a valid email address',
    query: 'Please select a query type',
    message: 'This field is required',
    checkbox: 'to submit this form, please consent by the team'
  })

  const [showError,setShowError] = useState(false)
  const [showToast,setShowToast] = useState(false)

  const onchangeAll =(e)=>{
    const { name, value } = e.target;
    let newValue = value
    setAll({...all,[name]:value})
    if (newValue.trim() === '') {
      setError({...error,[name]:'This field is required'})
    }else{
      setError({...error,[name]:''})
      
    }
  }

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const onchangeEmail = (e)=>{
    const newEmail = e.target.value
    setAll({...all,email:newEmail})
    if(!validateEmail(newEmail)){
      setError({...error,email:'Please enter a valid email address'})
    }else{
      setError({...error,email:''})
    }
  }





  const onSubmitFunc = ()=>{
    if(all.checkbox && validateEmail(all.email) && all.message && all.lastName && all.firstName && error.query === ''){
      setShowError(false)
      setTimeout(() => {
        setShowToast(true)
      }, 500);
    }else{
      setShowError(true)
    }
  }


  useEffect(()=>{
    let newError = { ...error };
  if (all.general || all.support) {
    newError.query = '';
  } else {
    newError.query = 'Please select a query type';
  }
  if (all.checkbox === false) {
    newError.checkbox = 'to submit this form, please consent by the team';
  } else {
    newError.checkbox = '';
  }
  setError(newError);

  if(showToast){
    setTimeout(() => {
      setShowToast(false)
      setAll({
        firstName: '',
        lastName: '',
        email: '',
        general: false,
        support: false,
        message: '',
        checkbox: false
      })
      setError({
        firstName: 'This field is required',
        lastName: 'This field is required',
        email: 'Please enter a valid email address',
        query: 'Please select a query type',
        message: 'This field is required',
        checkbox: 'to submit this form, please consent by the team'
      })
    }, 3000);
  }
  },[all,showToast])


  return (
    <div className='app' style={{paddingTop:showToast ? 20 : 40}}>
      {showToast && <div className="app-toast">
        <nav>
          <div>
            <img src={markIcon} />
          </div>
          <h5>Message Sent!</h5>
        </nav>
        <p>Thanks for completing the form. We'll be in touch soon!</p>
      </div>}
      <div className="app-holder">
        <h2>Contact Us</h2>
        <main>
          <article>
            <label>First Name <span>*</span></label>
            <input style={{borderColor:showError && error.firstName ? 'red' : 'hsl(186, 15%, 59%)'}} type="text" name='firstName' value={all.firstName} onChange={onchangeAll} />
            {showError && <small>{error.firstName}</small>}
          </article>
          <article>
            <label>Last Name <span>*</span></label>
            <input style={{borderColor:showError && error.lastName ? 'red' : 'hsl(186, 15%, 59%)'}} type="text" name='lastName' value={all.lastName} onChange={onchangeAll} />
            {showError && <small>{error.lastName}</small>}
          </article>
        </main>
        <main>
          <section>
            <label>Email Address <span>*</span></label>
            <input style={{borderColor:showError && error.email ? 'red' : 'hsl(186, 15%, 59%)'}} type="email" name='email' value={all.email} onChange={onchangeEmail}/>
            {showError && <small>{error.email}</small>}
          </section>
        </main>
        <main style={{flexDirection:'column',minHeight:65,justifyContent:'space-around'}}>
        <label>Query Type<span>*</span></label>
        <nav>
          <aside style={{backgroundColor:all.general ? 'hsl(148, 38%, 91%)' : 'white',borderColor:all.general ? 'hsl(169, 82%, 27%)' : 'hsl(186, 15%, 59%)'}} onClick={()=>setAll({...all,general:true,support:false})}>
            <div style={{border:all.general ? 'none' : '1px solid gainsboro'}} >
              {all.general && <img src={radioIcon} />}
            </div>
            <p>General Enquiry</p>
          </aside>
          <aside style={{backgroundColor:all.support ? 'hsl(148, 38%, 91%)' : 'white',borderColor:all.support ? 'hsl(169, 82%, 27%)' : 'hsl(186, 15%, 59%)'}} onClick={()=>setAll({...all,general:false,support:true})}>
            <div style={{border:all.support ? 'none' : '1px solid gainsboro'}} >
              {all.support && <img src={radioIcon} />}
            </div>
            <p>Support Request</p>
          </aside>
        </nav>
        {showError && <small>{error.query}</small>}
        </main>
        <header>
          <label >Message <span>*</span></label>
          <textarea style={{borderColor:showError && error.message ? 'red' : 'hsl(186, 15%, 59%)'}} name='message' value={all.message} onChange={onchangeAll}></textarea>
          {showError && <small>{error.message}</small>}
        </header>
        <footer>
          <nav>
          <div style={{border:all.checkbox ? 'none' : '1px solid hsl(186, 15%, 59%)'}} onClick={()=>setAll({...all,checkbox:!all.checkbox})}>
            {all.checkbox && <img src={checkIcon} />}
          </div>
          <p>I consent to being contacted by the team <span>*</span></p>
          </nav>
          {showError && <small>{error.checkbox}</small>}
        </footer>
        <button onClick={onSubmitFunc}>Submit</button>
      </div>
    </div>
  )
}

export default App
