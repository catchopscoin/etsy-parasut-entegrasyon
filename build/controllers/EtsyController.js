"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtsyController = void 0;
const EtsyService_1 = require("../services/EtsyService");
class EtsyController {
    constructor() {
        // OAuth başlat
        this.startAuth = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authUrl = this.etsyService.getAuthUrl();
                res.redirect(authUrl);
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Etsy yetkilendirme hatası'
                });
            }
        });
        // Ürünleri getir
        this.getListings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const listings = yield this.etsyService.getListings();
                res.json({
                    success: true,
                    data: listings
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Etsy ürünleri getirilirken hata oluştu'
                });
            }
        });
        // Ürün görsellerini getir
        this.getListingImages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { listingId } = req.params;
                const images = yield this.etsyService.getListingImages(listingId);
                res.json({
                    success: true,
                    data: images
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Ürün görselleri getirilirken hata oluştu'
                });
            }
        });
        // Ürün stok bilgisini getir
        this.getListingInventory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { listingId } = req.params;
                const inventory = yield this.etsyService.getListingInventory(listingId);
                res.json({
                    success: true,
                    data: inventory
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Stok bilgisi getirilirken hata oluştu'
                });
            }
        });
        // Siparişleri getir
        this.getOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.etsyService.getOrders();
                res.json({
                    success: true,
                    data: orders
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Etsy siparişleri getirilirken hata oluştu'
                });
            }
        });
        // Sipariş öğelerini getir
        this.getOrderItems = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderId } = req.params;
                const items = yield this.etsyService.getOrderItems(orderId);
                res.json({
                    success: true,
                    data: items
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Sipariş öğeleri getirilirken hata oluştu'
                });
            }
        });
        // OAuth callback
        this.handleCallback = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { code } = req.query;
                if (!code) {
                    throw new Error('Authorization code eksik');
                }
                const tokenData = yield this.etsyService.handleCallback(code.toString());
                res.json({
                    success: true,
                    message: 'OAuth başarılı',
                    data: tokenData
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'OAuth işlemi başarısız'
                });
            }
        });
        // Mağaza bilgileri
        this.getShopInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shopInfo = yield this.etsyService.getShopInfo();
                res.json({
                    success: true,
                    data: shopInfo
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Mağaza bilgileri getirilirken hata oluştu'
                });
            }
        });
        // Ürün detayları
        this.getListingDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { listingId } = req.params;
                const details = yield this.etsyService.getListingDetails(listingId);
                res.json({
                    success: true,
                    data: details
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Ürün detayları getirilirken hata oluştu'
                });
            }
        });
        // Sipariş detayları
        this.getOrderDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderId } = req.params;
                const details = yield this.etsyService.getOrderDetails(orderId);
                res.json({
                    success: true,
                    data: details
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: 'Sipariş detayları getirilirken hata oluştu'
                });
            }
        });
        this.etsyService = new EtsyService_1.EtsyService();
    }
}
exports.EtsyController = EtsyController;
