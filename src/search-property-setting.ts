import { Setting } from "obsidian";
import GeocodingPlugin from "./main";
import { GeocodingPluginSettingTab } from "./settings-tab";
import { moveElementUp, moveElementDown } from "./utils/array";

const CLASS_NAMES = {
	propertyInput: "geocoding-search-property-input",
	propertyMoveButton: "geocoding-search-property-move-button",
	propertyDeleteButton: "geocoding-search-property-delete-button",
	propertyInfoEl: "geocoding-search-property-info-el",
};

export default class SearchPropertySetting extends Setting {
	constructor(
		plugin: GeocodingPlugin,
		settingTab: GeocodingPluginSettingTab,
		containerEl: HTMLElement,
		value: string,
		index: number
	) {
		super(containerEl);
		this.addText((cb) =>
			cb
				.setValue(value)
				.setPlaceholder("Property name")
				.onChange(async (newValue) => {
					plugin.settings.searchPropertyOrder[index] = newValue;
					await plugin.saveSettings();
				})
				.inputEl.addClass(CLASS_NAMES.propertyInput)
		)
			.addExtraButton((cb) =>
				cb
					.setIcon("move-up")
					.setDisabled(index === 0)
					.onClick(async () => {
						moveElementUp(
							plugin.settings.searchPropertyOrder,
							index
						);
						await plugin.saveSettings();
						settingTab.display();
					})
					.extraSettingsEl.addClass(CLASS_NAMES.propertyMoveButton)
			)
			.addExtraButton((cb) =>
				cb
					.setIcon("move-down")
					.setDisabled(
						index === plugin.settings.searchPropertyOrder.length - 1
					)
					.onClick(async () => {
						moveElementDown(
							plugin.settings.searchPropertyOrder,
							index
						);
						await plugin.saveSettings();
						settingTab.display();
					})
					.extraSettingsEl.addClass(CLASS_NAMES.propertyMoveButton)
			)
			.addExtraButton((cb) =>
				cb
					.setIcon("trash-2")
					.onClick(async () => {
						plugin.settings.searchPropertyOrder.splice(index, 1);
						await plugin.saveSettings();
						settingTab.display();
					})
					.extraSettingsEl.addClass(CLASS_NAMES.propertyDeleteButton)
			);
		this.infoEl.addClass(CLASS_NAMES.propertyInfoEl);
		return this;
	}
}
