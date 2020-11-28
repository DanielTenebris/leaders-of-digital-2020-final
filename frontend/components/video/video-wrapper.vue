<template>
  <div class="video-wrapper">
    <div v-if="!session" id="join">
      <div id="join-dialog" class="jumbotron vertical-center">
        <a-row type="flex">
          <a-col
            v-show="sessions.length"
            v-for="conf in sessions"
            :key="conf.id"
            :span="5"
          >
            <ui-cloud
              class="video-wrapper__conference"
              @click="connectConf(conf)"
            >
              Войти в конференцию
              <span>{{ conf.id }}</span>
              <img src="/img/peoples.png" alt="" />
            </ui-cloud>
          </a-col>
          <a-col :span="8">
            <ui-cloud class="video-wrapper__create">
              <a-input
                v-model="mySessionId"
                type="text"
                placeholder="Название конференции"
              />
              <ui-button @click="joinSession()">
                Создать конференцию
              </ui-button>
            </ui-cloud>
          </a-col>
        </a-row>
      </div>
    </div>

    <div v-if="session" id="session">
      <div id="session-header">
        <ui-button class="leave" @click="leaveSession">Выйти</ui-button>
      </div>
      <a-row type="flex" justify="center">
        <a-col :span="12" id="main-video">
          <video-user :stream-manager="mainStreamManager" />
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between">
        <a-col id="video-container" :span="3">
          <video-user
            :stream-manager="publisher"
            @click.native="updateMainVideoStreamManager(publisher)"
          />
        </a-col>
        <a-col
          :span="3"
          v-for="sub in subscribers"
          :key="sub.stream.connection.connectionId"
        >
          <video-user
            :stream-manager="sub"
            @click.native="updateMainVideoStreamManager(sub)"
          />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { OpenVidu } from 'openvidu-browser';

export default {
  name: 'video-wrapper',

  data() {
    return {
      sessions: [],
      OV: undefined,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      mySessionId: '',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
    };
  },

  async mounted() {
    this.$axios.setHeader(
      'Authorization',
      'Basic ' + Buffer.from('OPENVIDUAPP:DanielNikita').toString('base64'),
    );
    const { data: sessions } = await this.$axios.get(
      'https://172.27.146.210:4443/openvidu/api/sessions',
    );
    console.log(sessions);
    this.sessions = sessions.content;
  },

  methods: {
    connectConf(conf) {
      console.log(conf);
      this.OV = new OpenVidu();
      this.session = this.OV.initSession();
      this.session.on('streamCreated', ({ stream }) => {
        const subscriber = this.session.subscribe(stream);
        this.subscribers.push(subscriber);
      });
      this.session.on('streamDestroyed', ({ stream }) => {
        const index = this.subscribers.indexOf(stream.streamManager, 0);
        if (index >= 0) {
          this.subscribers.splice(index, 1);
        }
      });
      this.createToken(conf.id).then(token => {
        this.session
          .connect(token, { clientData: this.myUserName })
          .then(() => {
            let publisher = this.OV.initPublisher(undefined, {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: true,
              publishVideo: true,
              resolution: '640x480',
              frameRate: 30,
              insertMode: 'APPEND',
              mirror: false,
            });
            this.mainStreamManager = publisher;
            this.publisher = publisher;
            console.log({ ...this.mainStreamManager });

            this.session.publish(this.publisher);
          })
          .catch(error => {
            console.log(
              'There was an error connecting to the session:',
              error.code,
              error.message,
            );
          });
      });
      window.addEventListener('beforeunload', this.leaveSession);
    },

    joinSession() {
      this.OV = new OpenVidu();
      this.session = this.OV.initSession();
      this.session.on('streamCreated', ({ stream }) => {
        const subscriber = this.session.subscribe(stream);
        this.subscribers.push(subscriber);
      });
      this.session.on('streamDestroyed', ({ stream }) => {
        const index = this.subscribers.indexOf(stream.streamManager, 0);
        if (index >= 0) {
          this.subscribers.splice(index, 1);
        }
      });
      this.getToken(this.mySessionId).then(token => {
        this.session
          .connect(token, { clientData: this.myUserName })
          .then(() => {
            let publisher = this.OV.initPublisher(undefined, {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: true,
              publishVideo: true,
              resolution: '640x480',
              frameRate: 30,
              insertMode: 'APPEND',
              mirror: false,
            });
            this.mainStreamManager = publisher;
            this.publisher = publisher;
            console.log({ ...this.mainStreamManager });

            this.session.publish(this.publisher);
          })
          .catch(error => {
            console.log(
              'There was an error connecting to the session:',
              error.code,
              error.message,
            );
          });
      });
      window.addEventListener('beforeunload', this.leaveSession);
    },
    leaveSession() {
      if (this.session) this.session.disconnect();
      this.session = undefined;
      this.mainStreamManager = undefined;
      this.publisher = undefined;
      this.subscribers = [];
      this.OV = undefined;
      window.removeEventListener('beforeunload', this.leaveSession);
    },
    updateMainVideoStreamManager(stream) {
      if (this.mainStreamManager === stream) return;
      this.mainStreamManager = stream;
    },

    getToken(mySessionId) {
      return this.createSession(mySessionId).then(sessionId =>
        this.createToken(sessionId),
      );
    },

    createSession(sessionId) {
      const OPENVIDU_SERVER_URL = 'https://172.27.146.210:4443';
      const OPENVIDU_SERVER_SECRET = 'DanielNikita';

      this.$axios.setHeader('Content-Type', 'application/json', ['post']);
      return new Promise((resolve, reject) => {
        this.$axios
          .post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
            JSON.stringify({
              customSessionId: sessionId,
            }),
            {
              auth: {
                username: 'OPENVIDUAPP',
                password: OPENVIDU_SERVER_SECRET,
              },
            },
          )
          .then(response => response.data)
          .then(data => resolve(data.id))
          .catch(error => {
            if (error.response.status === 409) {
              resolve(sessionId);
            } else {
              console.warn(
                `No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL}`,
              );
              if (
                window.confirm(
                  `No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL}\n\nClick OK to navigate and accept it. If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${OPENVIDU_SERVER_URL}"`,
                )
              ) {
                location.assign(`${OPENVIDU_SERVER_URL}/accept-certificate`);
              }
              reject(error.response);
            }
          });
      });
    },
    createToken(sessionId) {
      const OPENVIDU_SERVER_URL = 'https://172.27.146.210:4443';

      return new Promise((resolve, reject) => {
        this.$axios
          .post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
            {},
            {
              auth: {
                username: 'OPENVIDUAPP',
                password: 'DanielNikita',
              },
            },
          )
          .then(response => response.data)
          .then(data => resolve(data.token))
          .catch(error => reject(error.response));
      });
    },
  },
};
</script>

<style lang="scss">
.video-wrapper {
  .ant-input {
    margin-bottom: 20px;
  }
  &__conference {
    cursor: pointer;
    span {
      margin-top: 13px;
      margin-bottom: 13px;
      display: block;
      font-family: Circe;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
    }
    img {
      height: 30px;
      display: block;
    }
  }
  .leave {
    margin-bottom: 30px;
  }
}
</style>
