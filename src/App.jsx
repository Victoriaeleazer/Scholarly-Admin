import React, { useState } from 'react';
// import plant from './assets/plant.jpg'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

     // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage('Both email and password are required!');
    } else {
      setErrorMessage('');
      // Handle your form submission here (e.g., send data to the server)
      console.log('Form submitted:', { email, password });
    }
  };


  return(
    <div class="form-hold">
 
        
        <div className='form-left'>   
            <div className="form-container">
                <h2>Login to Your Account</h2>
                {/* <h3>Login using social networks</h3> */}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email"></label>
                        <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        />
                    </div>

                    <div>
                        <label htmlFor="password"></label>
                        <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        />
                    </div>
                      {errorMessage && <p className="error">{errorMessage}</p>}
                    
                    <div className='btn'>
                        <button type="submit">Sign in</button>
                    </div>
                </form>
            </div>
    
        </div>

        <div className="form-right" >
            <div className="form-right-inner">
                <h1>NEW HERE?</h1>
                <h2>Sign up and discover a great <br />amount of new opportunities!</h2>

              <div className="btn">
                  <button>Sign up</button>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Login;