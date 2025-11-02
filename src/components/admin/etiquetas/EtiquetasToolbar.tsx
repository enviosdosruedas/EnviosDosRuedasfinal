// src/components/admin/etiquetas/EtiquetasToolbar.tsx
'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Search, Bell, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { EtiquetaStatus } from '@/types';
import { Badge } from '@/components/ui/badge';

interface EtiquetasToolbarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  allCount: number;
  pendingCount: number;
  printedCount: number;
}

const FilterButton = ({ status, label, icon: Icon, count, onStatusFilterChange, statusFilter }: { status: string; label: string; icon: React.ElementType; count: number; onStatusFilterChange: (status: string) => void; statusFilter: string; }) => (
    <Button
      onClick={() => onStatusFilterChange(status)}
      variant={statusFilter === status ? 'default' : 'outline'}
      className="h-10 text-sm"
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
      <Badge variant={statusFilter === status ? 'secondary' : 'default'} className="ml-2">{count}</Badge>
    </Button>
  );

export function EtiquetasToolbar({
  searchTerm,
  onSearchTermChange,
  statusFilter,
  onStatusFilterChange,
  dateRange,
  onDateRangeChange,
  allCount,
  pendingCount,
  printedCount
}: EtiquetasToolbarProps) {

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por cliente, destinatario o n° de orden..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="w-full pl-10 h-10"
          />
        </div>
        <div className="flex-shrink-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal h-10 md:w-[300px]",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y", { locale: es })} -{" "}
                      {format(dateRange.to, "LLL dd, y", { locale: es })}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y", { locale: es })
                  )
                ) : (
                  <span>Seleccionar rango de fechas</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={onDateRangeChange}
                numberOfMonths={2}
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground mr-2">Filtrar por estado:</span>
        <FilterButton status="all" label="Todas" icon={Bell} count={allCount} onStatusFilterChange={onStatusFilterChange} statusFilter={statusFilter} />
        <FilterButton status={EtiquetaStatus.PENDIENTE} label="Pendientes" icon={XCircle} count={pendingCount} onStatusFilterChange={onStatusFilterChange} statusFilter={statusFilter} />
        <FilterButton status={EtiquetaStatus.IMPRESA} label="Impresas" icon={CheckCircle} count={printedCount} onStatusFilterChange={onStatusFilterChange} statusFilter={statusFilter} />
      </div>
    </div>
  );
}
