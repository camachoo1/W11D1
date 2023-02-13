import { useState, useEffect } from 'react';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneType, setPhoneType] = useState('');
  const [staff, setStaff] = useState('');
  const [bio, setBio] = useState('');
  const [notes, setNotes] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    const errors = [];

    if (name.length < 1) {
      errors.push('Please enter your name');
    }

    if (!email.includes('@') && !email.includes('.')) {
      errors.push('Please enter a valid email address');
    }

    // if (phone.) {
    //   errors.push('Please enter a valid phone number');
    // }

    if (phone.length && phoneType === 'disabled') {
      errors.push('Please chose a valid phone type');
    }

    if (bio.length > 280) {
      errors.push('Bio must be less than 280 characters');
    }

    setValidationErrors(errors);
  }, [name, email, phone, phoneType, bio]);

  const onSubmit = (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length > 0) {
      return alert('Cannot submit due to errors');
    }

    const formFieldsObject = {
      name,
      email,
      phone,
      phoneType,
      staff,
      bio,
      notes,
      submittedOn: new Date(),
    };

    setName('');
    setEmail('');
    setPhone('');
    setPhoneType('');
    setStaff('');
    setBio('');
    setNotes('');
    setValidationErrors([]);
    setHasSubmitted(false);
    console.log(formFieldsObject);
  };

  return (
    <>
      <h2>Form Element</h2>
      <form onSubmit={onSubmit}>
        {validationErrors.length > 0 && hasSubmitted && (
          <div>
            Errors when attempting to submit form:
            <ul>
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <label>
          Name:
          <input
            type='text'
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type='text'
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <select
            name='phoneType'
            onChange={(e) => setPhoneType(e.target.value)}
            value={phoneType}
          >
            <option value='disabled'>Select phone type:</option>
            <option value='home'>Home</option>
            <option value='work'>Work</option>
            <option value='mobile'>Mobile</option>
          </select>
        </label>
        <br />
        <label>
          Select role:
          <label>
            Student
            <input
              type='radio'
              name='staff'
              onChange={(e) => setStaff(e.target.value)}
              value={staff}
            />
          </label>
        </label>
        <label>
          Teacher
          <input
            type='radio'
            name='staff'
            onChange={(e) => setStaff(e.target.value)}
            value={staff}
          />
        </label>
        <br />
        <label>
          Bio:
          <br />
          <textarea
            name='bio'
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </label>
        <br />
        <input
          type='checkbox'
          name='notifications'
          onClick={(e) => setNotes(this.state.active)}
          value={notes}
        />
        <label>
          Check this box to receive emails about promotions.
        </label>
        <br />
        <input type='submit' value='Sign Up' />
      </form>
    </>
  );
};

export default Form;
