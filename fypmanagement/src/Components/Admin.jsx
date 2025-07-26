import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
  const [groups, setGroups] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  const excludedFields = [
    '_id',
    'marks',
    'internalMarks',
    'attendance',
    'designFeedback',
    'thesisMarks',
    'designCodeMarks',
    'demoRuntimeMarks',
    'externalMarks',
    'proposalUrl',
    'thesisUrl',
    'similarityReportUrl',
    'projectCodeUrl',
    'fypGroupMembers',
  ];

  useEffect(() => {
    fetch('http://localhost:8000/api/auth/getgroup', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setGroups(data))
      .catch(err => console.error('Error fetching groups:', err));
  }, [token]);

  const handleEdit = group => {
    setEditId(group._id);
    setFormData({ ...group });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({});
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    fetch(`http://localhost:8000/api/auth/update/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(updated => {
        setGroups(groups.map(g => (g._id === editId ? updated : g)));
        setEditId(null);
        setFormData({});
      })
      .catch(err => console.error('Error updating group:', err));
  };

  const renderField = (label, name, value, isEditable = true) => (
    <div className="mb-2" key={name}>
      <label className="form-label">{label}</label>
      <input
        type="text"
        name={name}
        value={value ?? ''}
        className="form-control"
        onChange={handleChange}
        disabled={!isEditable}
      />
    </div>
  );

  const prettifyLabel = key =>
    key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, s => s.toUpperCase())
      .replace(/Id$/, 'ID');

  const renderFileLink = (label, path) =>
    path ? (
      <p key={label}>
        <strong>{label}:</strong>{' '}
        <a href={path} target="_blank" rel="noopener noreferrer" className="link-primary">
          View File
        </a>
      </p>
    ) : null;

  const filteredGroups = groups.filter(group =>
    group.fypGroupName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="d-flex justify-content-center py-5 bg-light min-vh-100">
      <div className="col-lg-8 col-md-10 col-sm-12">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Admin Panel</h1>
          
        </div>

        <input
          type="text"
          className="form-control mb-4 shadow-sm"
          placeholder="🔍 Search by FYP Group Name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="accordion" id="groupAccordion">
          {filteredGroups.map((group, idx) => (
            <div
              className="accordion-item mb-3 border-0 shadow-sm rounded"
              key={group._id}
              style={{ transition: 'all 0.3s ease-in-out' }}
            >
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed bg-white fw-semibold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#group${idx}`}
                >
                  {group.fypGroupName} — {group.fypTitle}
                </button>
              </h2>
              <div
                id={`group${idx}`}
                className="accordion-collapse collapse"
                data-bs-parent="#groupAccordion"
              >
                <div className="accordion-body">
                  {editId === group._id ? (
                    <>
                      {renderField('Group ID', '_id', group._id, false)}
                      {Object.keys(group).map(key =>
                        excludedFields.includes(key)
                          ? null
                          : renderField(prettifyLabel(key), key, formData[key])
                      )}
                      <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-success" onClick={handleSave}>
                          💾 Save
                        </button>
                        <button className="btn btn-secondary" onClick={handleCancel}>
                          ❌ Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p><strong>Category:</strong> {group.fypCategory}</p>
                      <p><strong>Program:</strong> {group.program}</p>
                      <p><strong>Supervisor:</strong> {group.supervisor}</p>
                      <p><strong>External Examiner:</strong> {group.externalExaminer}</p>

                      {/* Members with Fee Proof Links */}
                     <div className="mt-3">
  <h6 className="fw-bold">Group Members</h6>
  <ul className="list-group">
    {group.fypGroupMembers?.map((m, i) => (
      <li
        key={i}
        className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
      >
        <div className="mb-2 mb-md-0">
          <div className="fw-semibold text-primary">{m.name}</div>
          <small className="text-muted">
           R.No.:{m.roll} <br/> Email:{m.email} <br/> Mobile No.:{m.phone}
          </small>
        </div>
        <div>
          <a
            href={m.feeProofPath}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-success"
          >
            📎 View Fee Proof
          </a>
        </div>
      </li>
    ))}
  </ul>
</div>


                      {/* Files */}
                      {renderFileLink('Proposal File', group.proposalUrl)}
                      {renderFileLink('Thesis File', group.thesisUrl)}
                      {renderFileLink('Similarity Report', group.similarityReportUrl)}
                      {renderFileLink('Project Code', group.projectCodeUrl)}

                      <div className="mt-3">
                        <strong>Group ID:</strong> <code>{group._id}</code>
                      </div>

                      <button className="btn btn-outline-primary mt-3" onClick={() => handleEdit(group)}>
                        ✏️ Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
