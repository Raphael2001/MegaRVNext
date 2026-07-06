import API_METHODS from "constants/ApiMethods";
import { createCMSApiMethods } from "./base";

import Store from "redux-store";
import { setInit, updateInit, updateKey, updateKeyById } from "redux-store/features/initSlice";
import { ApiResponse } from "utils/types/api";
import { addSectionPageData, deleteSectionPageData, setPageData, setSectionPageData } from "redux-store/features/dynamicPage";
import WOO_SOURCES from "constants/WooSource";
const cms = {
	links: createCMSApiMethods("links", [{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }], "links"),
	metaTags: createCMSApiMethods(
		"metaTags",
		[{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }],
		"metaTags",
	),
	iamRoles: createCMSApiMethods("iamRole", [{ method: API_METHODS.POST }, { method: API_METHODS.PUT }], "iamRoles"),
	cmsUsers: createCMSApiMethods("cmsUsers", [{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }], "users"),
	texts: createCMSApiMethods("texts", [{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }], "texts"),
	media: createCMSApiMethods("media", [{ method: API_METHODS.POST }, { method: API_METHODS.DELETE }], "media"),
	file: createCMSApiMethods("file", [{ method: API_METHODS.POST }, { method: API_METHODS.DELETE }], "files"),
	languages: createCMSApiMethods(
		"languages",
		[{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }],
		"languages",
	),
	sort: createCMSApiMethods("sort", [{ method: API_METHODS.POST, useBasicCMSOnSuccess: false }]),
	generalInfo: createCMSApiMethods(
		"generalInfo",
		[{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }],
		"generalInfo",
	),

	initCms: createCMSApiMethods("initCms", [
		{
			method: API_METHODS.GET,
			onSuccess: (res: ApiResponse) => {
				Store.dispatch(setInit(res.body));
			},
			useBasicCMSOnSuccess: false,
		},
	]),

	syncDB: createCMSApiMethods("syncDataBase", [
		{
			method: API_METHODS.POST,
			useBasicCMSOnSuccess: false,
		},
	]),

	dynamicPages: createCMSApiMethods(
		"dynamicPages",
		[
			{ method: API_METHODS.POST },
			{ method: API_METHODS.PUT },
			{ method: API_METHODS.DELETE },
			{
				method: API_METHODS.GET,
				onSuccess: (res: ApiResponse) => {
					Store.dispatch(setPageData(res.body));
				},
			},
		],
		"dynamicPages",
	),
	dynamicPagesSections: createCMSApiMethods("dynamicPagesSections", [
		{
			method: API_METHODS.POST,
			useBasicCMSOnSuccess: false,
			onSuccess: (res: ApiResponse) => {
				Store.dispatch(addSectionPageData(res.body));
			},
		},
		{
			method: API_METHODS.PUT,
			useBasicCMSOnSuccess: false,
			onSuccess: (res: ApiResponse) => {
				Store.dispatch(setSectionPageData(res.body));
			},
		},
		{
			method: API_METHODS.DELETE,
			useBasicCMSOnSuccess: false,
			onSuccess: (res: ApiResponse) => {
				Store.dispatch(deleteSectionPageData(res.body));
			},
		},
	]),
	smsTemplates: createCMSApiMethods(
		"smsTemplate",
		[{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }],
		"smsTemplates",
	),
	meetingTypes: createCMSApiMethods(
		"meetingType",
		[{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }],
		"meetingTypes",
	),
	wooProducts: createCMSApiMethods("wooProducts", [
		{
			method: API_METHODS.PUT,
			useBasicCMSOnSuccess: false,
			onSuccess: (res: ApiResponse) => {
				const source = res.body.source;

				switch (source) {
					case WOO_SOURCES.HOMEOT:
						Store.dispatch(updateKeyById({ value: res.body.product, name: "homeotProducts" }));
						break;
					case WOO_SOURCES.REFUA_VE_TEVA:
						Store.dispatch(updateKeyById({ value: res.body.product, name: "refuaVeTevaProducts" }));
						break;
				}
			},
		},
	]),

	refuaVeTevaProducts: createCMSApiMethods("refuaVeTevaProducts", [
		{
			method: API_METHODS.PUT,
			useBasicCMSOnSuccess: false,
			onSuccess: (res: ApiResponse) => {
				Store.dispatch(updateInit({ refuaVeTevaProducts: res.body.products }));
			},
		},
	]),

	homeotProducts: createCMSApiMethods("homeotProducts", [
		{
			method: API_METHODS.PUT,
			useBasicCMSOnSuccess: false,
			onSuccess: (res: ApiResponse) => {
				Store.dispatch(updateInit({ homeotProducts: res.body.products }));
			},
		},
	]),
	powerLinkProducts: createCMSApiMethods("powerLinkProducts", [
		{
			method: API_METHODS.PUT,
			useBasicCMSOnSuccess: false,
			onSuccess: (res: ApiResponse) => {
				Store.dispatch(updateInit({ powerLinkProducts: res.body.products }));
			},
		},
	]),
	couponSalesAgents: createCMSApiMethods(
		"couponSalesAgent",
		[{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }],
		"couponSalesAgents",
	),
	leadSources: createCMSApiMethods(
		"leadSource",
		[{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }],
		"leadSources",
	),
	phoneLeadSources: createCMSApiMethods(
		"phoneLeadSource",
		[{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }],
		"phoneLeadSources",
	),
	leadAgents: createCMSApiMethods(
		"leadAgentMapping",
		[{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }],
		"leadAgents",
	),
	taskOwnerOverrides: createCMSApiMethods(
		"taskOwnerOverride",
		[{ method: API_METHODS.POST }, { method: API_METHODS.PUT }, { method: API_METHODS.DELETE }],
		"taskOwnerOverrides",
	),
	powerLinkUsers: createCMSApiMethods("powerLinkUsers", [
		{
			method: API_METHODS.PUT,
			useBasicCMSOnSuccess: false,
			onSuccess: (res: ApiResponse) => {
				Store.dispatch(updateInit({ powerLinkUsers: res.body }));
			},
		},
	]),
	salesAgents: createCMSApiMethods("salesAgents", [
		{
			method: API_METHODS.PUT,
			useBasicCMSOnSuccess: false,
			onSuccess: (res: ApiResponse) => {
				Store.dispatch(updateInit({ salesAgents: res.body }));
			},
		},
	]),
};

export default cms;
