import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventConfig from '../config/eventConfig';

const initialForm = {
  name: '', email: '', phone: '', college: '', department: '',
  year: '', city: '', enrollmentNo: '', participantType: 'Student', ieeeMember: '',
  dietaryRequirements: '', otherInfo: '', agreedToTerms: false,
};

export default function Registration() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('form'); // form | processing | error
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[+]?[\d\s-]{7,15}$/.test(form.phone)) errs.phone = 'Enter a valid phone number';
    if (!form.college.trim()) errs.college = 'College name is required';
    if (!form.department.trim()) errs.department = 'Department is required';
    if (!form.year.trim()) errs.year = 'Year/Semester is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.enrollmentNo.trim()) errs.enrollmentNo = 'Enrollment number is required';
    if (!form.ieeeMember) errs.ieeeMember = 'Select IEEE membership status';
    if (!form.agreedToTerms) errs.agreedToTerms = 'You must agree to the terms';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');
    setStep('processing');

    try {
      // Step 1: Register participant
      const regRes = await fetch(`${eventConfig.apiBaseUrl}/registration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, agreedToTerms: String(form.agreedToTerms) }),
      });
      const regData = await regRes.json();

      if (!regRes.ok) {
        throw new Error(regData.message || 'Registration failed');
      }

      // Step 2: Create payment order
      const orderRes = await fetch(`${eventConfig.apiBaseUrl}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participantId: regData.data.participantId }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.message || 'Failed to create payment order');
      }

      // Step 3: Handle payment
      if (orderData.devMode) {
        // Dev mode — simulate payment verification
        const verifyRes = await fetch(`${eventConfig.apiBaseUrl}/payment/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: orderData.data.orderId,
            razorpay_payment_id: `dev_pay_${Date.now()}`,
            razorpay_signature: null,
            participantId: regData.data.participantId,
          }),
        });
        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          navigate(`/registration-success/${verifyData.data.registrationId}`);
        } else {
          throw new Error(verifyData.message || 'Payment verification failed');
        }
      } else {
        // Production — open Razorpay checkout
        const options = {
          key: orderData.data.keyId,
          amount: orderData.data.amount,
          currency: orderData.data.currency,
          name: 'IEEE RAS & IAS Workshop',
          description: `Registration Fee — ${eventConfig.currency}${eventConfig.registrationFee}`,
          order_id: orderData.data.orderId,
          prefill: orderData.data.prefill,
          theme: { color: '#00629B' },
          handler: async function (response) {
            try {
              const verifyRes = await fetch(`${eventConfig.apiBaseUrl}/payment/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  participantId: regData.data.participantId,
                }),
              });
              const verifyData = await verifyRes.json();

              if (verifyData.success) {
                navigate(`/registration-success/${verifyData.data.registrationId}`);
              } else {
                setServerError(verifyData.message || 'Payment verification failed.');
                setStep('error');
              }
            } catch (err) {
              setServerError('Payment verification failed. Please contact support.');
              setStep('error');
            }
          },
          modal: {
            ondismiss: function () {
              setStep('form');
              setLoading(false);
            },
          },
        };

        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          throw new Error('Payment gateway not loaded. Please refresh and try again.');
        }
      }
    } catch (err) {
      setServerError(err.message);
      setStep('error');
      setLoading(false);
    }
  };

  if (step === 'processing') {
    return (
      <section className="section" id="registration">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="reg__processing">
            <div className="reg__spinner"></div>
            <h2 style={{ marginTop: 'var(--space-4)', color: 'var(--color-navy)' }}>Processing Registration...</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
              Please wait while we set up your payment.
            </p>
          </div>
        </div>
        <style>{spinnerStyle}</style>
      </section>
    );
  }

  if (step === 'error') {
    return (
      <section className="section" id="registration">
        <div className="container" style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>⚠️</div>
          <h2 style={{ color: 'var(--color-navy)', marginBottom: 'var(--space-3)' }}>Registration Error</h2>
          <p style={{ color: 'var(--color-error)', marginBottom: 'var(--space-6)' }}>{serverError}</p>
          <button className="btn btn-primary btn-large" onClick={() => { setStep('form'); setLoading(false); }}>
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section-alt" id="registration">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Registration</span>
          <h2 className="section-title">Register for the Workshop</h2>
          <p className="section-subtitle">
            Secure your spot at the International Workshop. Registration fee: <strong>{eventConfig.currency}{eventConfig.registrationFee}/-</strong>
          </p>
        </div>

        <form className="reg__form" onSubmit={handleSubmit} noValidate>
          <div className="reg__fee-banner">
            <span className="reg__fee-label">Registration Fee</span>
            <span className="reg__fee-amount">{eventConfig.currency}{eventConfig.registrationFee}/-</span>
            <span className="reg__fee-sub">per participant</span>
          </div>

          <div className="reg__grid">
            <FormField label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Enter your full name" required />
            <FormField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="your@email.com" required />
            <FormField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+91-XXXXXXXXXX" required />
            <FormField label="College / University" name="college" value={form.college} onChange={handleChange} error={errors.college} placeholder="Your college or university name" required />
            <FormField label="Department" name="department" value={form.department} onChange={handleChange} error={errors.department} placeholder="e.g., Computer Science" required />
            <FormField label="Year / Semester" name="year" value={form.year} onChange={handleChange} error={errors.year} placeholder="e.g., 3rd Year / 6th Semester" required />
            <FormField label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} placeholder="Your city" required />
            <FormField label="Enrollment No." name="enrollmentNo" value={form.enrollmentNo} onChange={handleChange} error={errors.enrollmentNo} placeholder="e.g., 0901CS211001" required />

            <div className="form-group">
              <label className="form-label">Participant Type</label>
              <input className="form-input" type="text" value="Student" disabled style={{ background: 'var(--color-gray-100)', cursor: 'not-allowed' }} />
            </div>

            <div className="form-group">
              <label className="form-label">IEEE Membership <span className="required">*</span></label>
              <select className={`form-select ${errors.ieeeMember ? 'error' : ''}`} name="ieeeMember" value={form.ieeeMember} onChange={handleChange}>
                <option value="">Select status</option>
                <option value="Yes">Yes — IEEE Member</option>
                <option value="No">No</option>
              </select>
              {errors.ieeeMember && <p className="form-error">{errors.ieeeMember}</p>}
            </div>

            <FormField label="Dietary Requirements" name="dietaryRequirements" value={form.dietaryRequirements} onChange={handleChange} placeholder="Optional" />
            <FormField label="Other Information" name="otherInfo" value={form.otherInfo} onChange={handleChange} placeholder="Optional" />
          </div>

          <div className="checkbox-group" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <input type="checkbox" id="agreedToTerms" name="agreedToTerms" checked={form.agreedToTerms} onChange={handleChange} />
            <label htmlFor="agreedToTerms">
              I agree to the event <a href={eventConfig.legal.termsConditions} target="_blank" rel="noreferrer">terms and conditions</a>.
            </label>
          </div>
          {errors.agreedToTerms && <p className="form-error" style={{ marginTop: '-var(--space-4)', marginBottom: 'var(--space-4)' }}>{errors.agreedToTerms}</p>}

          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="btn btn-register btn-large" disabled={loading}>
              {loading ? 'Processing...' : `Register Now – ${eventConfig.currency}${eventConfig.registrationFee}`}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .reg__form {
          max-width: 750px;
          margin: 0 auto;
          background: var(--color-white);
          border-radius: var(--radius-xl);
          padding: var(--space-10);
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--color-gray-200);
        }

        .reg__fee-banner {
          text-align: center;
          background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 100%);
          border-radius: var(--radius-lg);
          padding: var(--space-5);
          margin-bottom: var(--space-8);
          color: var(--text-inverse);
        }

        .reg__fee-label {
          display: block;
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 2px;
          opacity: 0.7;
          margin-bottom: var(--space-1);
        }

        .reg__fee-amount {
          display: block;
          font-size: var(--text-4xl);
          font-weight: 900;
          line-height: 1.2;
        }

        .reg__fee-sub {
          font-size: var(--text-sm);
          opacity: 0.6;
        }

        .reg__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }

        .reg__processing {
          padding: var(--space-16) 0;
        }

        .reg__spinner {
          width: 48px;
          height: 48px;
          border: 4px solid var(--color-gray-200);
          border-top-color: var(--color-ieee-blue);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .reg__form {
            padding: var(--space-6);
          }
          .reg__grid {
            grid-template-columns: 1fr;
          }
          .reg__fee-amount {
            font-size: var(--text-3xl);
          }
        }
      `}</style>
    </section>
  );
}

function FormField({ label, name, type = 'text', value, onChange, error, placeholder, required }) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        id={name}
        className={`form-input ${error ? 'error' : ''}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

const spinnerStyle = `
  .reg__spinner {
    width: 48px;
    height: 48px;
    border: 4px solid var(--color-gray-200);
    border-top-color: var(--color-ieee-blue);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;
