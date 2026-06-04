import React, { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  
  const [candidates, setCandidates] = useState([]);
  const [candidateName, setCandidateName] = useState('');
  const [candidateParty, setCandidateParty] = useState('');
  
  const [voters, setVoters] = useState([]);
  const [voterName, setVoterName] = useState('');
  const [selectedCandidateId, setSelectedCandidateId] = useState('');

  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('15');
  const [splitCount, setSplitCount] = useState('1');
  const [billResult, setBillResult] = useState(null);

  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (!candidateName.trim() || !candidateParty.trim()) return;
    const newCandidate = {
      id: Date.now(),
      name: candidateName,
      party: candidateParty,
      votes: 0
    };
    setCandidates([...candidates, newCandidate]);
    setCandidateName('');
    setCandidateParty('');
  };

  const handleAddVoter = (e) => {
    e.preventDefault();
    if (!voterName.trim() || !selectedCandidateId) return;
    
    const newVoter = {
      id: Date.now(),
      name: voterName,
      votedFor: candidates.find(c => c.id === Number(selectedCandidateId))?.name || 'Unknown'
    };

    setCandidates(candidates.map(cand => {
      if (cand.id === Number(selectedCandidateId)) {
        return { ...cand, votes: cand.votes + 1 };
      }
      return cand;
    }));

    setVoters([...voters, newVoter]);
    setVoterName('');
    setSelectedCandidateId('');
  };

  const handleCalculateBill = (e) => {
    e.preventDefault();
    const amount = parseFloat(billAmount);
    const tipPercent = parseFloat(tipPercentage);
    const people = parseInt(splitCount);

    if (isNaN(amount) || amount <= 0 || isNaN(people) || people <= 0) return;

    const tipAmount = amount * (tipPercent / 100);
    const totalAmount = amount + tipAmount;
    const amountPerPerson = totalAmount / people;

    setBillResult({
      tipAmount: tipAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      amountPerPerson: amountPerPerson.toFixed(2)
    });
  };

  const tabStyle = (tabName) => ({
    padding: '12px 20px',
    cursor: 'pointer',
    backgroundColor: activeTab === tabName ? '#007bff' : '#f8f9fa',
    color: activeTab === tabName ? 'white' : 'black',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    marginRight: '10px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  });

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    border: '1px solid #eee'
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
    backgroundColor: '#fff',
    color: '#333'
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
    marginBottom: '30px'
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left'
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', color: '#333' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
        <h1 style={{ color: '#fff', fontSize: '28px', lineHeight: '1.4', margin: '0 0 10px 0' }}>
          Web Application
        </h1>
        <p style={{ color: '#aaa', margin: 0 }}>CSCI390: Web Programming - Project Phase 2</p>
      </header>

      <nav style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <button style={tabStyle('home')} onClick={() => setActiveTab('home')}>
          🏠 Home
        </button>
        <button style={tabStyle('election')} onClick={() => setActiveTab('election')}>
          🗳️ Election Management
        </button>
        <button style={tabStyle('calculator')} onClick={() => setActiveTab('calculator')}>
          🧮 Bill Calculator
        </button>
        <button style={tabStyle('contact')} onClick={() => setActiveTab('contact')}>
          📞 About & Contact
        </button>
      </nav>

      <main style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: '400px' }}>
        
        {activeTab === 'home' && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <h2 style={{ color: '#007bff' }}>Welcome to the Dashboard</h2>
            <p style={{ fontSize: '16px', color: '#666', maxWidth: '800px', margin: '20px auto', lineHeight: '1.6' }}>
              This responsive ReactJS web application serves as a comprehensive automation platform, developed for Phase 2 of the CSCI390 course. The application combines advanced frontend technologies to deliver two core practical services.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '40px' }}>
              <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '6px', backgroundColor: '#fdfdfd' }}>
                <h3>🗳️ Election Management</h3>
                <p style={{ color: '#666' }}>Automates candidate registration, ballot casting, and features real-time vote calculation standings.</p>
              </div>
              <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '6px', backgroundColor: '#fdfdfd' }}>
                <h3>🧮 Bill Calculator</h3>
                <p style={{ color: '#666' }}>Provides instantaneous cost-splitting capabilities including personalized tip percentage parameters.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'election' && (
          <div>
            <h2 style={{ color: '#007bff', marginBottom: '20px' }}>Election Management Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <h3>Add New Candidate</h3>
                <form onSubmit={handleAddCandidate} style={formStyle}>
                  <input 
                    type="text" 
                    placeholder="Candidate Full Name" 
                    value={candidateName} 
                    onChange={(e) => setCandidateName(e.target.value)}
                    style={inputStyle}
                  />
                  <input 
                    type="text" 
                    placeholder="Political Party / List" 
                    value={candidateParty} 
                    onChange={(e) => setCandidateParty(e.target.value)}
                    style={inputStyle}
                  />
                  <button type="submit" style={buttonStyle}>Register Candidate</button>
                </form>
              </div>

              <div>
                <h3>Voter Registration & Balloting</h3>
                <form onSubmit={handleAddVoter} style={formStyle}>
                  <input 
                    type="text" 
                    placeholder="Voter Full Name" 
                    value={voterName} 
                    onChange={(e) => setVoterName(e.target.value)}
                    style={inputStyle}
                  />
                  <select 
                    value={selectedCandidateId} 
                    onChange={(e) => setSelectedCandidateId(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="">-- Select Candidate to Vote For --</option>
                    {candidates.map(cand => (
                      <option key={cand.id} value={cand.id}>{cand.name} ({cand.party})</option>
                    ))}
                  </select>
                  <button type="submit" style={{ ...buttonStyle, backgroundColor: '#28a745' }}>Cast Vote</button>
                </form>
              </div>
            </div>

            <h3>Candidates Standings</h3>
            {candidates.length === 0 ? <p style={{ color: '#888' }}>No candidates registered yet.</p> : (
              <table style={tableStyle}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={thTdStyle}>Name</th>
                    <th style={thTdStyle}>Party</th>
                    <th style={thTdStyle}>Total Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map(cand => (
                    <tr key={cand.id}>
                      <td style={thTdStyle}>{cand.name}</td>
                      <td style={thTdStyle}>{cand.party}</td>
                      <td style={{ ...thTdStyle, fontWeight: 'bold' }}>{cand.votes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <h3>Recent Logs</h3>
            {voters.length === 0 ? <p style={{ color: '#888' }}>No votes cast yet.</p> : (
              <table style={tableStyle}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={thTdStyle}>Voter</th>
                    <th style={thTdStyle}>Voted For</th>
                  </tr>
                </thead>
                <tbody>
                  {voters.map(voter => (
                    <tr key={voter.id}>
                      <td style={thTdStyle}>{voter.name}</td>
                      <td style={thTdStyle}>{voter.votedFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'calculator' && (
          <div>
            <h2 style={{ color: '#28a745', marginBottom: '20px' }}>Bill Calculator Utility</h2>
            <form onSubmit={handleCalculateBill} style={{ ...formStyle, maxWidth: '500px', margin: '0 auto 30px auto' }}>
              <label style={{ fontWeight: 'bold' }}>Bill Amount ($)</label>
              <input 
                type="number" 
                step="0.01"
                placeholder="Enter total bill amount" 
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                style={inputStyle}
              />

              <label style={{ fontWeight: 'bold' }}>Tip Percentage</label>
              <select 
                value={tipPercentage}
                onChange={(e) => setTipPercentage(e.target.value)}
                style={inputStyle}
              >
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
              </select>

              <label style={{ fontWeight: 'bold' }}>Number of People</label>
              <input 
                type="number" 
                min="1"
                value={splitCount}
                onChange={(e) => setSplitCount(e.target.value)}
                style={inputStyle}
              />

              <button type="submit" style={{ ...buttonStyle, backgroundColor: '#28a745' }}>Calculate Split</button>
            </form>

            {billResult && (
              <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '2px dashed #28a745', borderRadius: '6px', backgroundColor: '#f4fbf6' }}>
                <h3 style={{ color: '#28a745', marginTop: 0, textAlign: 'center' }}>Calculation Summary</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <span>Calculated Tip:</span>
                  <span style={{ fontWeight: 'bold' }}>${billResult.tipAmount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <span>Grand Total Bill:</span>
                  <span style={{ fontWeight: 'bold' }}>${billResult.totalAmount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0 0', fontSize: '18px', color: '#28a745', fontWeight: 'bold' }}>
                  <span>Amount Per Person:</span>
                  <span>${billResult.amountPerPerson}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ color: '#17a2b8', textAlign: 'center', marginBottom: '25px' }}>About & Contact Information</h2>
            <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '6px', backgroundColor: '#fdfdfd', marginBottom: '20px' }}>
              <h3>Project Information</h3>
              <p><strong>Course:</strong> CSCI390: Web Programming</p>
              <p><strong>Phase:</strong> Phase 2 Frontend Implementation</p>
              <p><strong>Developer:</strong> Ahmad Dgheim</p>
            </div>
            <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '6px', backgroundColor: '#fdfdfd' }}>
              <h3>Get In Touch</h3>
              <p>For academic inquiries regarding this project submission, please contact via the official student channels or code repository documentation.</p>
            </div>
          </div>
        )}

      </main>

      <footer style={{ marginTop: '50px', textAlign: 'center', color: '#aaa', fontSize: '12px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        © 2026 - CSCI390 Project Dashboard | Ahmad Dgheim
      </footer>
    </div>
  );
}

export default App;