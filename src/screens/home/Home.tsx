import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { GoogleLogin } from 'react-google-login';

import './Home.less';
import AppLayout from '@layout/app';
import { googleClietID } from '@constants/general';

type Props = {};

const Home: React.FC<Props> = () => {
  const responseGoogle = (response: any) => {
    const { profileObj, accessToken } = response;
    if (accessToken && profileObj) {
      const data = {
        accessToken: accessToken,
        name: profileObj.name,
        email: profileObj.email,
        type: 'Google'
      };
      console.log(data);
    }
  };

  return (
    <AppLayout>
      <Row align="middle" justify="center">
        <Col xs={24} sm={24} md={20} lg={10} xl={10}>
          <Card
            hoverable
            style={{ width: '100%', height: 'auto', marginTop: '2rem' }}
            cover={
              <img
                alt="example"
                src="https://images.pexels.com/photos/38547/office-freelancer-computer-business-38547.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              />
            }
          >
            <GoogleLogin
              clientId={googleClietID}
              render={(renderProps: any) => (
                <Button
                  htmlType="submit"
                  size="large"
                  block
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Google Sign In
                </Button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Home;
