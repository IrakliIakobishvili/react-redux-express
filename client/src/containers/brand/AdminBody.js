import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate } from '../../actions/brand'

class AdminBody extends Component {
  state = {
    zDepth: 1,
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  editing = (bool) => this.setState({ editing: bool })
  render() {
    const {
      _id,
      canvasColor,
      dispatch,
      error,
      fontFamily,
      handleSubmit,
      isFetching,
      submitSucceeded,
      submitting
    } = this.props
    return (
      !isFetching &&
      <Card
        expanded={this.state.expanded}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="card"
        style={{ backgroundColor: canvasColor, fontFamily }}
      >
        <form
          onSubmit={handleSubmit((values) => {
            const path = `body/${_id}`
            return dispatch(fetchUpdate(path, { values }))
          })}
        >
          <CardTitle title="Body" />
          <div className="field-container">
            <Field
              name="backgroundColor"
              label="backgroundColor"
              type="text"
              component={renderTextField}
              className="field"
              style={{ fontFamily }}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="update body"
              successLabel="body updated!"
            />
          </div>
        </form>
      </Card>
    )
  }
}

AdminBody = reduxForm({
  form: 'body'
})(AdminBody)

const mapStateToProps = ({
  brand: {
    _id,
    isFetching,
    body: { values },
    theme: { fontFamily, palette: { canvasColor, primary1Color } }
  }
}) => ({
  _id,
  canvasColor,
  fontFamily,
  initialValues: values,
  isFetching,
  primary1Color
})

AdminBody = connect(mapStateToProps)(AdminBody)

export default AdminBody