import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProfileService, UserProfile } from 'src/app/core/services/profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profile: UserProfile | null = null;
    currentUserId: string | null = null;
    profileId: string | null = null;

    isEditing: boolean = false;
    editForm: FormGroup;

    loading: boolean = true;
    saving: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private profileService: ProfileService,
        private authService: AuthService,
        private notificationService: NotificationService,
        private fb: FormBuilder
    ) {
        this.editForm = this.fb.group({
            bio: [''],
            profilePicture: ['']
        });
    }

    ngOnInit(): void {
        const user = this.authService.getCurrentUser();
        this.currentUserId = user?.id || user?._id || user?.userId || null;

        this.route.paramMap.subscribe(params => {
            let id = params.get('id');
            if (!id && this.currentUserId) {
                // If route is just /home/profile, default to current user
                id = this.currentUserId;
            }

            if (id) {
                this.profileId = id;
                this.fetchProfile(id);
            } else {
                this.loading = false;
            }
        });
    }

    fetchProfile(id: string) {
        this.loading = true;
        this.profileService.getProfile(id).subscribe({
            next: (resp) => {
                if (resp.success) {
                    this.profile = resp.data;
                    this.editForm.patchValue({
                        bio: this.profile.bio || '',
                        profilePicture: this.profile.profilePicture || ''
                    });
                }
                this.loading = false;
            },
            error: (err) => {
                this.notificationService.showNotification('error', 'Failed to load profile');
                this.loading = false;
                console.error(err);
            }
        });
    }

    toggleEdit() {
        this.isEditing = !this.isEditing;
        if (this.isEditing && this.profile) {
            this.editForm.patchValue({
                bio: this.profile.bio || '',
                profilePicture: this.profile.profilePicture || ''
            });
        }
    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.editForm.patchValue({ profilePicture: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    }

    saveProfile() {
        if (this.editForm.invalid) return;

        this.saving = true;
        const formValue = this.editForm.value;

        // Clean string input, convert empty strings to undefined if preferred by backend
        const updateData: any = {};
        if (formValue.bio !== null && formValue.bio !== undefined) updateData.bio = formValue.bio;
        if (formValue.profilePicture !== null && formValue.profilePicture !== undefined) updateData.profilePicture = formValue.profilePicture;

        this.profileService.updateProfile(updateData).subscribe({
            next: (resp) => {
                if (resp.success) {
                    this.profile = resp.data;
                    this.notificationService.showNotification('success', 'Profile updated successfully');
                    this.isEditing = false;
                }
                this.saving = false;
            },
            error: (err) => {
                this.notificationService.showNotification('error', 'Failed to update profile');
                this.saving = false;
                console.error(err);
            }
        });
    }
}
