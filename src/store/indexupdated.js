import * as actions from '@/store/actions'
import * as mutations from '@/store/mutations'
import state from '@/store/state'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default new Vuex.Store({
	state,
	mutations,
	actions,
	plugins: [createPersistedState()],
})
