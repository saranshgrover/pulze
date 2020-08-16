import React, { useReducer } from 'react'
import { useSession } from './SessionProvider'

export default function createCtx<StateType, ActionType>(
	reducer: React.Reducer<StateType, ActionType>,
	initialState: StateType
) {
	const defaultDispatch: React.Dispatch<ActionType> = () => initialState // we never actually use this
	const ctx = React.createContext({
		state: initialState,
		dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optioanl
	})
	function Provider(
		props: React.PropsWithChildren<{
			eventId: Timer.EventId
			subsetId?: Timer.subsetId
		}>
	) {
		const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(
			reducer,
			initialState
		)
		return <ctx.Provider value={{ state, dispatch }} {...props} />
	}
	return [ctx, Provider] as const
}
