import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import ImageForm from '../../components/images/ImageForm'
import { fetchUpdate } from '../../actions/brand'

class AdminAppBar extends Component {
  state = {
    zDepth: 1,
    editing: false
  }
  componentWillReceiveProps({ submitSucceeded }) {
    if (submitSucceeded) this.setState({ editing: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  editing = (bool) => this.setState({ editing: bool })
  deleteImage = (_id, update) => this.props.dispatch(fetchUpdate(`appbar/${_id}`, update))
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { _id, dispatch, error, handleSubmit, image, imageSpec, submitSucceeded, submitting } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
      >
        <CardTitle title="AppBar" />
        <CardMedia>
          <ImageForm
            imageSpec={imageSpec}
            image={image}
            _id={_id}
            editing={this.editing}
            deleteImage={this.deleteImage}
            ref={this.setEditorRef}
          />
        </CardMedia>
        <form onSubmit={handleSubmit((values) => {
          const path = `appbar/${_id}`
          if (this.state.editing) {
            const img = this.editor.handleSave()
            return dispatch(fetchUpdate(path, { type: 'UPDATE_IMAGE_AND_VALUES', image: img, values }))
          }
          return dispatch(fetchUpdate(path, { type: 'UPDATE_VALUES', values }))
        })}
        >
          <div className="field-container">
            <Field
              name="backgroundColor"
              label="backgroundColor"
              type="text"
              component={renderTextField}
              className="field"
            />
            <Field
              name="brandColor"
              label="brandColor"
              type="text"
              component={renderTextField}
              className="field"
            />
            <Field
              name="brandFontFamily"
              label="brandFontFamily"
              type="text"
              component={renderTextField}
              className="field"
            />
            <Field
              name="navColor"
              label="navColor"
              type="text"
              component={renderTextField}
              className="field"
            />
          </div>

          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="APPBAR"
            />
          </div>
        </form>
      </Card>
    )
  }
}

AdminAppBar = reduxForm({
  form: 'appBar'
})(AdminAppBar)

const mapStateToProps = ({ brand: { _id, appBar: { image, styles } }}) => ({
  _id,
  image,
  initialValues: {
    ...styles
  }
})

AdminAppBar = connect(mapStateToProps)(AdminAppBar)

export default AdminAppBar
