import React, { useEffect, useRef, useState } from 'react'
import { Radio } from 'antd'
import styles from './index.module.less'
import { DRAW_GEOMETRY, DRAW_MODE } from './config'
import EventBus from '../../../utils/EventBus'
import { EUserActionEventName } from '../../config/eventname.enum'
import { init } from '../../control/init'

function Canvas(props: any): React.ReactElement {
	const canvasRef = useRef<null>(null)
	const [drawMode, setDrawMode] = useState<string>(DRAW_MODE.SELECT)
	const [canvasId, setCanvasId] = useState<string>('webcanvas')
	const [drawGeometry, setDrawGeometry] = useState<string>(DRAW_GEOMETRY.LINE)

	const setDrawModeAction = (e: any): void => {
		setDrawMode(e.target.value)
		EventBus.emit(EUserActionEventName.UpdateDrawMode, { value: e.target.value })
	}
	const setDrawGeometryAction = (e: any): void => {
		setDrawGeometry(e.target.value)
		EventBus.emit(EUserActionEventName.UpdateDrawGeometryType, { value: e.target.value })
	}

	useEffect((): void => {
		init()
		EventBus.emit(EUserActionEventName.InitCanvas, { canvasElementId: canvasId })
		EventBus.emit(EUserActionEventName.UpdateDrawMode, { value: DRAW_MODE.SELECT })
		EventBus.emit(EUserActionEventName.UpdateDrawGeometryType, { value: DRAW_GEOMETRY.LINE })
	}, [])

	return (
		<section>
			<div className={styles['canvas-container']}>
				<div className={styles['canvas-content-wrapper']}>
					<canvas id={canvasId} ref={canvasRef}></canvas>
				</div>
			</div>
			<section className={styles['control-container']}>
				<div>
					<label>Draw Mode: </label>
					<Radio.Group onChange={setDrawModeAction} value={drawMode}>
						<Radio value={DRAW_MODE.DRAW}>{DRAW_MODE.DRAW}</Radio>
						<Radio value={DRAW_MODE.SELECT}>{DRAW_MODE.SELECT}</Radio>
					</Radio.Group>
				</div>
				<div>
					<label>Draw Geometry: </label>
					<Radio.Group onChange={setDrawGeometryAction} value={drawGeometry}>
						<Radio value={DRAW_GEOMETRY.RECT}>{DRAW_GEOMETRY.RECT}</Radio>
						<Radio value={DRAW_GEOMETRY.LINE}>{DRAW_GEOMETRY.LINE}</Radio>
						<Radio value={DRAW_GEOMETRY.CIRCLE}>{DRAW_GEOMETRY.CIRCLE}</Radio>
					</Radio.Group>
				</div>
			</section>
		</section>
	)
}

export default React.memo(Canvas)
