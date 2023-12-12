import { createStore } from 'vuex'
import {login,getInfo,register} from '@/api/login'
import {setToken,getToken,removeToken,setId,getId} from '@/utils/auth'
import { getCount,upFile } from '../api/upFile'

const defaultState = {
  id: getId(),
  username: '',
  avatar: '',
  token: getToken(),
  code: '',
  funs: 0,
  pictures: 0,
  redirectPath:'/'
}

// Create a new store instance.
export default createStore({
  state() {
    return defaultState
  },
  mutations: {
    SET_ID(state,id){
      state.id = id;
    },
    SET_USERNAME(state, username) {
      state.username = username;
    },
    SET_AVATAR(state,avatar){
      state.avatar=avatar;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_CODE(state, code) {
      state.code = code;
    },
    SET_FUNS(state,fCount){
      state.funs = fCount;
    },
    SET_PICTURES(state,pCount){
      state.pictures = pCount;
    },
    SET_REDIRECTPATH(state,path){
      state.redirectPath = path;
    }
  },
  actions: {
    Login({commit}, userInfo) {
      const username = userInfo.username;
      const password = userInfo.password;
      return new Promise((resolve, reject) => {
        login(username,password).then(res =>{
            if(res.data.code == 40000){
              reject(res.data.msg)
            }
            const data = res.data.data
            setToken(data.token)
            setId(data.id)
            commit('SET_USERNAME',data.username)
            commit('SET_AVATAR',data.head)
            commit('SET_TOKEN',data.token);
            commit('SET_CODE',res.data.code);
            resolve();
        }).catch(error =>{
            reject(error)
        })
      })
    },
    Register({commit},userInfo){
      const username=userInfo.username;
      const password=userInfo.password;
      const phone =userInfo.phone;
      return new Promise((resolve, reject) => {
        register(username,password,phone).then(res =>{
            if(res.data.code == 40000){
              reject(res.data.msg)
            }
            resolve(res);
        }).catch(error =>{
            reject(error)
        })
      })
    },
    GetInfo({commit}) {
      return new Promise((resolve, reject) => {
        getInfo().then(res =>{
 
          if(res.data.code == 1)
          {
            const data = res.data.data
            console.log(data)
            commit('SET_ID',data.id)
            commit('SET_USERNAME',data.username)
            commit('SET_AVATAR',data.avatar)
            resolve(res.data);
          }
        }).catch(error =>{
            reject(error)
      })
      })
    },
    LogOut({commit,state}){
      return new Promise((resolve,reject) =>{
        commit('SET_AVATAR',''),
        commit('SET_USERNAME',''),
        removeToken();
        resolve()
      })
    },
    GetCount({commit,state}){
      return new Promise((resolve,reject)=>{
        getCount().then(res=>{
          console.log(res)
          const pCount=res.data[0].split(':')[1]
          const fCount=res.data[1].split(':')[1]
          console.log(pCount+' '+fCount)
          commit('SET_FUNS',fCount)
          commit('SET_PICTURES',pCount)
          resolve()
        }).catch(error=>{
          reject(error)
        })
      }) 
    },
    UpFile({commit},{data,type}){
      return new Promise((resolve,reject)=>{
        upFile(data,type).then(res =>{
          console.log(res)
          const pCount=res.data[0].split(':')[1]
          const fCount=res.data[1].split(':')[1]
          console.log(pCount+' '+fCount)
          commit('SET_FUNS',fCount)
          commit('SET_PICTURES',pCount)
          resolve('success')
        }).catch(error =>{
          reject(error)
        })
      })
    },
    recordRouter({commit},path){
      commit('SET_REDIRECTPATH',path)
    }
  },
 
  getters: {
 
  }
})

export const store = createStore()




