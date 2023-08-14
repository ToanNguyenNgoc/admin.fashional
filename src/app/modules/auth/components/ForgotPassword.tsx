import { useCallback, useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import queryString from 'query-string'
import { useMutation } from 'react-query'
import { BodyForgot } from 'app/models'
import { _auth } from 'app/apis'
import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { useMessage } from 'app/hooks'
import { AxiosError } from 'axios'
import { Snack } from 'app/components'
import { LoadingButton } from '@mui/lab'

export function ForgotPassword() {
  const token: any = queryString.parse(useLocation().search).token
  const navigate = useNavigate()
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false)
  const { result, notification, onClose } = useMessage()
  const [captcha, setCaptcha] = useState('')
  const verifyRecaptchaCallback = useCallback((tokenCaptcha: string) => {
    setCaptcha(tokenCaptcha)
  }, [])
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: BodyForgot) => _auth.forgot(body),
    onSuccess: (data) => {
      setRefreshReCaptcha(r => !r)
      result({
        message: data.context.message,
        color: 'success',
      })
      if (token) setTimeout(() => { navigate('/auth/login') }, 2000)
    },
    onError: (err) => {
      const error = err as AxiosError
      result({
        message: error.response?.data.message,
        color: 'error'
      })
      setRefreshReCaptcha(r => !r)
    }
  })
  const formik = useFormik({
    initialValues: {
      email: '',
      platform: 'ADMIN',
      password: '',
      password_confirm: ''
    },
    validationSchema: Yup.object({
      email: !token ? Yup.string().required('Vui lòng nhập email') : Yup.string(),
      password: !token ? Yup.string() : Yup.string().required('Vui lòng nhập mật khẩu'),
      password_confirm: !token ? Yup.string() :
        Yup.string().required('Vui lòng nhập lại mật khẩu').oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
    }),
    onSubmit: (values) => {
      mutate({
        recaptcha: captcha,
        email: values.email,
        platform: 'ADMIN',
        password: values.password,
        token: token
      })
    }
  })
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY || ''}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <Snack open={notification.openAlert} onClose={onClose} severity={notification.color} message={notification.message} />
      {
        !token ?
          <>
            <form
              className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
              noValidate
              id='kt_login_password_reset_form'
              onSubmit={formik.handleSubmit}
            >
              <div className='text-center mb-10'>
                <h1 className='text-dark mb-3'>Quên mật khẩu ?</h1>
                <div className='text-gray-400 fw-bold fs-4'>Nhập địa chỉ Email để thay đổi mật khẩu.</div>
              </div>
              <div className='fv-row mb-10'>
                <label className='form-label fw-bolder text-gray-900 fs-6'>Email</label>
                <input
                  type='email'
                  placeholder=''
                  autoComplete='off'
                  {...formik.getFieldProps('email')}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    { 'is-invalid': formik.touched.email && formik.errors.email },
                    {
                      'is-valid': formik.touched.email && !formik.errors.email,
                    }
                  )}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.email}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
                <LoadingButton
                  type="submit"
                  size="medium"
                  color="info"
                  variant="contained"
                  loading={isLoading}
                >
                  Gửi email
                </LoadingButton>
              </div>
            </form>
          </>
          :
          <>
            <form
              className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
              noValidate
              id='kt_login_password_reset_form'
              onSubmit={formik.handleSubmit}
            >
              <div className='text-center mb-10'>
                <h1 className='text-dark mb-3'>Thay đổi mật khẩu</h1>
              </div>
              <div className='fv-row mb-10'>
                <label className='form-label fw-bolder text-gray-900 fs-6'>Mật khẩu</label>
                <input
                  type='password'
                  placeholder=''
                  autoComplete='off'
                  {...formik.getFieldProps('password')}
                  className="form-control form-control-lg form-control-solid"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.password}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='fv-row mb-10'>
                <label className='form-label fw-bolder text-gray-900 fs-6'>Nhập lại mật khẩu</label>
                <input
                  type='password'
                  placeholder=''
                  autoComplete='off'
                  {...formik.getFieldProps('password_confirm')}
                  className="form-control form-control-lg form-control-solid"
                />
                {formik.touched.password_confirm && formik.errors.password_confirm && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.password_confirm}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
                <LoadingButton
                  type="submit"
                  size="medium"
                  color="info"
                  variant="contained"
                  loading={isLoading}
                >
                  Đổi mật khẩu
                </LoadingButton>
              </div>
            </form>
          </>
      }
      <GoogleReCaptcha refreshReCaptcha={refreshReCaptcha} onVerify={verifyRecaptchaCallback} />
    </GoogleReCaptchaProvider>
  )
}
