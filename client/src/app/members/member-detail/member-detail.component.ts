import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../_services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
    selector: 'app-member-detail',
    standalone: true,
    imports: [TabsModule, GalleryModule],
    templateUrl: './member-detail.component.html',
    styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
    ngOnInit(): void {
        this.loadMember()
    }
    private memberService = inject(MemberService);
    private route = inject(ActivatedRoute);
    member?: Member;
    images: GalleryItem[] = [];

    loadMember() {
        const username = this.route.snapshot.paramMap.get('username');
        if (!username) return;
        this.memberService.getMember(username).subscribe({
            next: member => {
                this.member = member;
                member.photos.map(item => {
                    this.images.push(new ImageItem({
                        src: item.url,
                        thumb: item.url
                    }))
                })
            }
        })
    }
}
