import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryImageSize,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  // tslint:disable-next-line: typedef
  initializeGallery() {
    this.galleryOptions = [
      {
        width: '500px',
        height: '600px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Fade,
        imageSize: NgxGalleryImageSize.Contain,
        thumbnailSize: NgxGalleryImageSize.Contain,
        preview: false,
      },
    ];
    this.galleryImages = this.getImages();
  }

  // tslint:disable-next-line: typedef
  getImages() {
    const imageUrls = [];
    for (const photo of this.product.photos) {
      imageUrls.push({
        small: photo.pictureUrl,
        medium: photo.pictureUrl,
        big: photo.pictureUrl,
      });
    }
    return imageUrls;
  }

  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  loadProduct() {
    // tslint:disable-next-line: deprecation
    this.shopService
      .getProduct(+this.activatedRoute.snapshot.paramMap.get('id'))
      // tslint:disable-next-line: deprecation
      .subscribe(
        (product) => {
          this.product = product;
          this.bcService.set('@productDetails', product.name);
          this.initializeGallery();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // tslint:disable-next-line: typedef
  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  // tslint:disable-next-line: typedef
  incrementQuantity() {
    this.quantity++;
  }

  // tslint:disable-next-line: typedef
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
