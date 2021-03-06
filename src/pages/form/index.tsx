import React, { memo, useCallback, useEffect } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useParams, useHistory } from 'react-router-dom'
import Component from './Component'
import Editor from './Editor'
import Property from './Property'
import { formCompDataListState, activeFormItemIndexState } from './store/atom'
import {
  useUniqueFormDataKey,
  useGetFormData,
  useResetFormData,
} from './store/hooks'
import { formCompList } from './store/types'

const FormPage: React.FC = () => {
  const history = useHistory()
  const setFormCompDataList = useSetRecoilState(formCompDataListState)
  const [activeFormItemIndex, setActiveFormItemIndex] = useRecoilState(
    activeFormItemIndexState
  )
  const generateUniqueFormDataKey = useUniqueFormDataKey()
  const resetFormData = useResetFormData()
  const getFormData = useGetFormData()
  const params = useParams<{ id: string }>()

  useEffect(() => {
    console.log('enter page param:id=', params.id)
    if (!params.id || params.id === 'new') {
      resetFormData()
      console.log('resetFormData')
    } else {
      const id = Number(params.id)
      if (id) {
        console.log('getFormData')
        getFormData(id).catch((err) => {
          console.error(err)
          history.replace('/f/new')
        })
      } else {
        history.replace('/f/new')
      }
    }
  }, [getFormData, history, params, resetFormData])

  // TODO
  // useEffect(() => {
  //   const onBeforeUnload = (e: BeforeUnloadEvent) => {
  //     console.log(e, 'onBeforeunload');
  //     e.preventDefault()
  //     e.returnValue = 'R U OK?'
  //   }
  //   window.addEventListener('beforeunload', onBeforeUnload)
  //   return () => window.removeEventListener('beforeunload', onBeforeUnload)
  // }, [])

  const onDragEnd = useCallback(
    (result: DropResult) => {
      console.log(result, 'onDragEnd')
      const { destination, source } = result
      if (destination) {
        if (destination.droppableId === source.droppableId) {
          const dIndex = destination.index
          const sIndex = source.index
          if (activeFormItemIndex === sIndex) {
            setActiveFormItemIndex(dIndex)
          }
          if (sIndex > dIndex) {
            setFormCompDataList((list) =>
              list
                .slice(0, dIndex)
                .concat(list[sIndex])
                .concat(list.slice(dIndex, sIndex))
                .concat(list.slice(sIndex + 1))
            )
          } else if (sIndex < dIndex) {
            setFormCompDataList((list) =>
              list
                .slice(0, sIndex)
                .concat(list.slice(sIndex + 1, dIndex + 1))
                .concat(list[sIndex])
                .concat(list.slice(dIndex + 1))
            )
          }
          return
        }
        const data = formCompList[source.index]
        const dIndex = destination.index
        const key = data.label + '_' + generateUniqueFormDataKey()
        setFormCompDataList((list) =>
          list
            .slice(0, dIndex)
            .concat({
              ...data,
              key,
              name: key,
            })
            .concat(list.slice(dIndex))
        )
        setActiveFormItemIndex(dIndex)
      }
    },
    [
      activeFormItemIndex,
      generateUniqueFormDataKey,
      setActiveFormItemIndex,
      setFormCompDataList,
    ]
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main id="form-container" className="flex">
        <Component />
        <Editor />
        <Property />
      </main>
    </DragDropContext>
  )
}

export default memo(FormPage)
