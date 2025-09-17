"use client";

import TABLE_CELL_TYPES from "constants/TableCellType";
import React from "react";
import { clsx } from "utils/functions";
import ColoredCell from "components/General/TableCreator/ColoredCell/ColoredCell";
import ActionsCell from "components/General/TableCreator/Actions/ActionsCell/ActionsCell";
import InputCell from "components/General/TableCreator/InputCell/InputCell";
import CheckBoxCell from "components/General/TableCreator/CheckBoxCell/CheckBoxCell";
import { InputEvent } from "utils/types/inputs";
import { DatasetItem, TableHeaderItem } from "utils/types/table";
import { DragHandle } from "components/General/DnD/Drag/Drag";
import { GeneralServerItem } from "utils/types/general";
import TextCell from "components/General/TableCreator/TextCell/TextCell";

type Props = {
	styleRef: Object;
	styles: Object;
	dataItem: GeneralServerItem;
	header: Object;
	selectedCheckboxes: Array<string>;
	onChangeCheckBox: (e: InputEvent) => void;
	enableDrag?: boolean;
};

function TableRow({ styleRef, styles, dataItem, header, onChangeCheckBox, selectedCheckboxes, enableDrag = false }: Props) {
	return (
		<div className={clsx(styles["table-row-wrapper"])}>
			{Object.keys(header).map((key, itemIndex) => {
				const title = header[key].title;
				const headerItem = header[key];
				return (
					<div
						style={styleRef}
						data-th={title}
						key={`table-body-item-${dataItem._id}${itemIndex}`}
						className={clsx(styles["table-item"], styles["table-body-item"])}
					>
						<RenderCell
							item={headerItem}
							value={getValue(key, dataItem)}
							name={key}
							data={dataItem}
							onChangeCheckBox={onChangeCheckBox}
							selectedCheckboxes={selectedCheckboxes}
						/>
					</div>
				);
			})}
			{enableDrag ? <DragHandle /> : null}
		</div>
	);
}

export default TableRow;

function getValue(key: string, dataItem: GeneralServerItem): string {
	let value = key.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""), dataItem);

	if (value !== "" && value !== undefined && value !== null) {
		return value;
	}

	if (typeof dataItem === "string") {
		return dataItem;
	}

	return "";
}

function getDisplayValue(
	dataset: Array<DatasetItem>,
	searchField: string,
	displayField: string,
	value: string | string[],
	opts: { joinWith?: string; unique?: boolean } = {},
): string | undefined {
	const { joinWith = ", ", unique = true } = opts;

	// Build an index for O(1) lookups when value is an array
	const index = new Map<string, unknown>();
	for (const item of dataset) {
		const key = item[searchField];
		if (typeof key === "string") index.set(key, item[displayField]);
	}

	// Helper: normalize the display value to a string
	const toStringValue = (v: unknown): string => {
		if (Array.isArray(v)) {
			// If displayField itself is an array of strings, join it
			return v.join(joinWith);
		}
		return v == null ? "" : String(v);
	};

	if (Array.isArray(value)) {
		if (value.length === 0) return "";

		const seen = new Set<string>();
		const parts: string[] = [];

		for (const key of value) {
			if (typeof key !== "string") continue;
			if (unique && seen.has(key)) continue;
			seen.add(key);

			const display = index.get(key);
			if (display !== undefined) {
				const str = toStringValue(display);
				if (str) parts.push(str);
			}
		}

		return parts.join(joinWith);
	}

	// Single string
	const display = index.get(value);
	if (display === undefined) return undefined;

	const str = toStringValue(display);
	return str || undefined;
}

type CellProps = {
	item: TableHeaderItem;
	value: string;
	name: string;
	data: GeneralServerItem;
	onChangeCheckBox: (e: InputEvent) => void;
	selectedCheckboxes: Array<string>;
};

function RenderCell({ item, value, name, data, onChangeCheckBox, selectedCheckboxes }: CellProps) {
	const {
		type,
		options = {},
		uniqueField = "",
		actions = [],
		onChangeInput = () => {},
		dataset,
		displayField = "",
		onOptionClick,
		copyBtn,
		searchField = "_id",
	} = item;

	function renderContent() {
		switch (type) {
			case TABLE_CELL_TYPES.CHECKBOXES:
				return (
					<CheckBoxCell
						field={uniqueField}
						name={name}
						data={data}
						onChange={onChangeCheckBox}
						values={selectedCheckboxes}
					/>
				);
			case TABLE_CELL_TYPES.INPUT:
				return (
					<InputCell
						name={name}
						onChange={onChangeInput}
						field={uniqueField}
						data={data}
					/>
				);

			case TABLE_CELL_TYPES.ACTION_BUTTONS:
				return (
					<ActionsCell
						data={data}
						actions={actions}
					/>
				);
			case TABLE_CELL_TYPES.COLORED_CELL:
				return (
					<ColoredCell
						value={value}
						options={options}
						onOptionClick={onOptionClick}
						id={data._id}
					/>
				);
			case TABLE_CELL_TYPES.COUNT_ROWS:
				if (Array.isArray(value)) {
					return value.length;
				}
				if (typeof value === "object") {
					return Object.keys(value).length;
				}
				return value;

			case TABLE_CELL_TYPES.TEXT_FROM_DATASET:
				if (Array.isArray(dataset)) {
					const displayValue = getDisplayValue(dataset, searchField, displayField, value);
					if (displayValue) {
						return displayValue;
					}

					return (
						<TextCell
							value={value}
							showCopy={copyBtn}
						/>
					);
				}

				return (
					<TextCell
						value={value}
						showCopy={copyBtn}
					/>
				);
			case TABLE_CELL_TYPES.TEXT:
			default:
				return (
					<TextCell
						value={value}
						showCopy={copyBtn}
					/>
				);
		}
	}

	return renderContent();
}
