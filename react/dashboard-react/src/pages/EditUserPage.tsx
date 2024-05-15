function EditUserPage() {
    return (
      <form className="row g-3">
        <div className="col-md-4">
          <label htmlFor="validationServer01" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control is-valid"
            id="validationServer01"
            value="Mark"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServer02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control is-valid"
            id="validationServer02"
            value="Otto"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServerUsername" className="form-label">
            Email
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend3">
              @
            </span>
            <input
              type="text"
              className="form-control is-invalid"
              id="validationServerUsername"
              aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
              required
            />
            <div
              id="validationServerUsernameFeedback"
              className="invalid-feedback"
            >
              Please choose an email.
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServer03" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control is-valid"
            id="validationServer03"
            value="Otto"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServer04" className="form-label">
            Duplicate password
          </label>
          <input
            type="text"
            className="form-control is-valid"
            id="validationServer04"
            value="Otto"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
    );
  }
  
  export default EditUserPage;
  