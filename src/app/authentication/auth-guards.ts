import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStateService } from '../services/application-state.service';

export const tripsGuard = () => {
  const router = inject(Router);
  const applicationService = inject(ApplicationStateService);

  if (applicationService.agentId === '' || !applicationService.agentId) {
    router.navigate(['agents']);
    return false;
  }

  return true;
};

export const tripCreationGuard = () => {
  const router = inject(Router);
  const applicationService = inject(ApplicationStateService);

  if (
    applicationService.agentId === '' ||
    !applicationService.agentId ||
    applicationService.currentTripId === '' ||
    !applicationService.currentTripId
  ) {
    router.navigate(['agents']);
    return false;
  }

  return true;
};
